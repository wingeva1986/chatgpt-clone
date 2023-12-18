import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  /* @ts-ignore */
  SSE,
  createPayload,
  tMessageSchema,
  tConversationSchema,
  EModelEndpoint,
  removeNullishValues,
} from 'librechat-data-provider';
import { useGetUserBalance, useGetStartupConfig } from 'librechat-data-provider/react-query';
import type { TResPlugin, TMessage, TConversation, TSubmission } from 'librechat-data-provider';
import { useAuthContext } from './AuthContext';
import useChatHelpers from './useChatHelpers';
import useSetStorage from './useSetStorage';

type TResData = {
  plugin?: TResPlugin;
  final?: boolean;
  initial?: boolean;
  requestMessage: TMessage;
  responseMessage: TMessage;
  conversation: TConversation;
  conversationId?: string;
};

export default function useSSE(submission: TSubmission | null, index = 0) {
  const setStorage = useSetStorage();
  const { conversationId: paramId } = useParams();
  const { token, isAuthenticated } = useAuthContext();
  const {
    addConvo,
    setMessages,
    setConversation,
    setIsSubmitting,
    resetLatestMessage,
    invalidateConvos,
    newConversation,
  } = useChatHelpers(index, paramId);

  const { data: startupConfig } = useGetStartupConfig();
  const balanceQuery = useGetUserBalance({
    enabled: !!isAuthenticated && startupConfig?.checkBalance,
  });

  const messageHandler = (data: string, submission: TSubmission) => {
    const {
      messages,
      message,
      plugin,
      plugins,
      initialResponse,
      isRegenerate = false,
    } = submission;

    if (isRegenerate) {
      setMessages([
        ...messages,
        {
          ...initialResponse,
          text: data,
          parentMessageId: message?.overrideParentMessageId ?? null,
          messageId: message?.overrideParentMessageId + '_',
          plugin: plugin ?? null,
          plugins: plugins ?? [],
          submitting: true,
          // unfinished: true
        },
      ]);
    } else {
      setMessages([
        ...messages,
        message,
        {
          ...initialResponse,
          text: data,
          parentMessageId: message?.messageId,
          messageId: message?.messageId + '_',
          plugin: plugin ?? null,
          plugins: plugins ?? [],
          submitting: true,
          // unfinished: true
        },
      ]);
    }
  };

  const cancelHandler = (data: TResData, submission: TSubmission) => {
    const { requestMessage, responseMessage, conversation } = data;
    const { messages, isRegenerate = false } = submission;

    const convoUpdate = conversation ?? submission.conversation;

    // update the messages
    if (isRegenerate) {
      const messagesUpdate = [...messages, responseMessage].filter((msg) => msg);
      setMessages(messagesUpdate);
    } else {
      const messagesUpdate = [...messages, requestMessage, responseMessage].filter((msg) => msg);
      setMessages(messagesUpdate);
    }

    // refresh title
    if (requestMessage?.parentMessageId == '00000000-0000-0000-0000-000000000000') {
      setTimeout(() => {
        invalidateConvos();
      }, 2000);

      // in case it takes too long.
      setTimeout(() => {
        invalidateConvos();
      }, 5000);
    }

    setConversation((prevState) => {
      const update = {
        ...prevState,
        ...convoUpdate,
      };

      setStorage(update);
      return update;
    });

    setIsSubmitting(false);
  };

  const createdHandler = (data: TResData, submission: TSubmission) => {
    const { messages, message, initialResponse, isRegenerate = false } = submission;

    if (isRegenerate) {
      setMessages([
        ...messages,
        {
          ...initialResponse,
          parentMessageId: message?.overrideParentMessageId ?? null,
          messageId: message?.overrideParentMessageId + '_',
          submitting: true,
        },
      ]);
    } else {
      setMessages([
        ...messages,
        message,
        {
          ...initialResponse,
          parentMessageId: message?.messageId,
          messageId: message?.messageId + '_',
          submitting: true,
        },
      ]);
    }

    const { conversationId } = message;

    let update = {} as TConversation;
    setConversation((prevState) => {
      update = tConversationSchema.parse({
        ...prevState,
        conversationId,
      });

      setStorage(update);
      return update;
    });
    if (message.parentMessageId == '00000000-0000-0000-0000-000000000000') {
      addConvo(update);
    }
    resetLatestMessage();
  };

  const finalHandler = (data: TResData, submission: TSubmission) => {
    const { requestMessage, responseMessage, conversation } = data;
    const { messages, conversation: submissionConvo, isRegenerate = false } = submission;

    // update the messages
    if (isRegenerate) {
      setMessages([...messages, responseMessage]);
    } else {
      setMessages([...messages, requestMessage, responseMessage]);
    }

    // refresh title
    if (requestMessage.parentMessageId == '00000000-0000-0000-0000-000000000000') {
      setTimeout(() => {
        invalidateConvos();
      }, 1500);

      // in case it takes too long.
      setTimeout(() => {
        invalidateConvos();
      }, 5000);
    }

    setConversation((prevState) => {
      const update = {
        ...prevState,
        ...conversation,
      };

      // Revert to previous model if the model was auto-switched by backend due to message attachments
      if (conversation.model?.includes('vision') && !submissionConvo.model?.includes('vision')) {
        update.model = submissionConvo?.model;
      }

      setStorage(update);
      return update;
    });

    setIsSubmitting(false);
  };

  const errorHandler = (data: TResData, submission: TSubmission) => {
    const { messages, message } = submission;

    if (!data.conversationId) {
      setIsSubmitting(false);
      return;
    }

    console.log('Error:', data);
    const errorResponse = tMessageSchema.parse({
      ...data,
      error: true,
      parentMessageId: message?.messageId,
    });

    setMessages([...messages, message, errorResponse]);
    if (data.conversationId && paramId === 'new') {
      newConversation({ template: { conversationId: data.conversationId } });
    }

    setIsSubmitting(false);
    return;
  };

  const abortConversation = (conversationId = '', submission: TSubmission) => {
    console.log(submission);
    const { endpoint } = submission?.conversation || {};

    fetch(`/api/ask/${endpoint}/abort`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        abortKey: conversationId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('aborted', data);
        cancelHandler(data, submission);
      })
      .catch((error) => {
        console.error('Error aborting request');
        console.error(error);
        setIsSubmitting(false);
      });
    return;
  };

  useEffect(() => {
    if (submission === null) {
      return;
    }
    if (Object.keys(submission).length === 0) {
      return;
    }

    let { message } = submission;

    const payloadData = createPayload(submission);
    let { payload } = payloadData;
    if (payload.endpoint === EModelEndpoint.assistant) {
      payload = removeNullishValues(payload);
    }

    const events = new SSE(payloadData.server, {
      payload: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });

    events.onmessage = (e: MessageEvent) => {
      const data = JSON.parse(e.data);

      if (data.final) {
        const { plugins } = data;
        finalHandler(data, { ...submission, plugins, message });
        startupConfig?.checkBalance && balanceQuery.refetch();
        console.log('final', data);
      }
      if (data.created) {
        message = {
          ...message,
          ...data.message,
          overrideParentMessageId: message?.overrideParentMessageId,
        };
        createdHandler(data, { ...submission, message });
      } else {
        const text = data.text || data.response;
        const { plugin, plugins } = data;

        if (data.message) {
          messageHandler(text, { ...submission, plugin, plugins, message });
        }
      }
    };

    events.onopen = () => console.log('connection is opened');

    events.oncancel = () =>
      abortConversation(message?.conversationId ?? submission?.conversationId, submission);

    events.onerror = function (e: MessageEvent) {
      console.log('error in opening conn.');
      startupConfig?.checkBalance && balanceQuery.refetch();
      events.close();

      let data = {} as TResData;
      try {
        data = JSON.parse(e.data);
      } catch (error) {
        console.error(error);
        console.log(e);
      }

      errorHandler(data, { ...submission, message });
    };

    setIsSubmitting(true);
    events.stream();

    return () => {
      const isCancelled = events.readyState <= 1;
      events.close();
      // setSource(null);
      if (isCancelled) {
        const e = new Event('cancel');
        events.dispatchEvent(e);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submission]);
}
