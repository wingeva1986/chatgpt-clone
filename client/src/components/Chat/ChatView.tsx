import { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { useGetMessagesByConvoId } from 'librechat-data-provider/react-query';
import { useChatHelpers, useSSE } from '~/hooks';
// import GenerationButtons from './Input/GenerationButtons';
import MessagesView from './Messages/MessagesView';
// import OptionsBar from './Input/OptionsBar';
import { ChatContext } from '~/Providers';
import Presentation from './Presentation';
import ChatForm from './Input/ChatForm';
import { Spinner } from '~/components';
import { buildTree } from '~/utils';
import Landing from './Landing';
import Header from './Header';
import Footer from './Footer';
import store from '~/store';

function ChatView({ index = 0 }: { index?: number }) {
  const { conversationId } = useParams();
  const submissionAtIndex = useRecoilValue(store.submissionByIndex(0));
  useSSE(submissionAtIndex);

  const { data: messagesTree = null, isLoading } = useGetMessagesByConvoId(conversationId ?? '', {
    select: (data) => {
      const dataTree = buildTree(data, false);
      return dataTree?.length === 0 ? null : dataTree ?? null;
    },
  });

  const chatHelpers = useChatHelpers(index, conversationId);

  return (
    <ChatContext.Provider value={chatHelpers}>
      <Presentation>
        {isLoading && conversationId !== 'new' ? (
          <div className="flex h-screen items-center justify-center">
            <Spinner className="opacity-0" />
          </div>
        ) : messagesTree && messagesTree.length !== 0 ? (
          <MessagesView messagesTree={messagesTree} Header={<Header />} />
        ) : (
          <Landing Header={<Header />} />
        )}
        {/* <OptionsBar messagesTree={messagesTree} /> */}
        {/* <GenerationButtons endpoint={chatHelpers.conversation.endpoint ?? ''} /> */}
        <div className="w-full border-t-0 pl-0 pt-2 dark:border-white/20 md:w-[calc(100%-.5rem)] md:border-t-0 md:border-transparent md:pl-0 md:pt-0 md:dark:border-transparent">
          <ChatForm index={index} />
          <Footer />
        </div>
      </Presentation>
    </ChatContext.Provider>
  );
}

export default memo(ChatView);
