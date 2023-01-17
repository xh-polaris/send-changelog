# send changelog action

Action used to send the changelog to the webhook of lark.

## Inputs

### `webhook_url`

**Required** The webhook of robot.

### `title`

**Required** The title of message.

## Example usage

```yaml
uses: xh-polaris/send-changelog@v1.0.0
with:
  webhook_url: https://example.com/path
  title: Changelog
```

## License

This project is under GPL-2.0 License

Copyright (c) 2022-present xh-polaris
