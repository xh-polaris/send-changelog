const fs = require("fs");
const core = require("@actions/core");
const axios = require("axios");

function sendChangLog() {
  // 机器人webhook
  const url =
    core.getInput("webhook_url");
  // 读取版本更新日志
  let data = fs.readFileSync(core.getInput("file_path"), "utf8");
  const secondIndex = data.indexOf("\n## ", 5);
  if (secondIndex !== -1) data = data.substring(2, secondIndex);
  // 请求参数配置
  const options = {
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    // markdown 消息类型
    data: JSON.stringify({
      msg_type: "interactive",
      card: {
        config: {
          wide_screen_mode: true
        },
        elements: [
          {
            tag: "markdown",
            content: data
          }
        ],
        header: {
          template: "blue",
          title: {
            content: core.getInput("title"),
            tag: "plain_text"
          }
        }
      }
    })
  };
  axios
    .post(url, options.data, {headers: new axios.AxiosHeaders(options.headers)})
    .then((res) => {
      if (res.status === 200) {
        console.log("发送消息成功");
        console.log(res.data)
      } else {
        console.error("发送消息失败");
        core.setFailed(res.data);
      }
    })
    .catch((err) => {
      console.error("发送消息失败");
      core.setFailed(err);
    });
}

sendChangLog();
