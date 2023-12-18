### General

LibreChat has central logging built into its backend (api).

Log files are saved in `/api/logs`. Error logs are saved by default. Debug logs are enabled by default but can be turned off if not desired.

This allows you to monitor your server through external tools that inspect log files, such as [the ELK stack](https://aws.amazon.com/what-is/elk-stack/).

Debug logs are essential for developer work and fixing issues. If you encounter any problems running LibreChat, reproduce as close as possible, and [report the issue](https://github.com/danny-avila/LibreChat/issues) with your logs found in `./api/logs/debug-%DATE%.log`. 

Errors logs are also saved in the same location: `./api/logs/error-%DATE%.log`. If you have meilisearch configured, there is a separate log file for this as well.

> Note: Logs are rotated on a 14-day basis, so you will generate 1 error log file, 1 debug log file, and 1 meiliSync log file per 14 days.
> Errors will also be present in debug log files as well, but provide stack traces and more detail in the error log files.

### Setup

Keep debug logs enabled with the following environment variable. Even if you never set this variable, debug logs will be generated, but you have the option to disable them by setting it to `FALSE`.

```bash
DEBUG_LOGGING=TRUE
```

For verbose server output in the console/terminal, you can also set the following:

```bash
DEBUG_CONSOLE=TRUE
```

This is not recommend, however, as the outputs can be quite verbose. It's disabled by default and should be enabled sparingly.