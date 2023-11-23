// Load the model.
require("@tensorflow/tfjs");
const qna = require("@tensorflow-models/qna");

const fs = require("fs");
let passage = ""; // 文章内容
let model = null; // 模型
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
fs.readFile("./article.txt", "utf8", (err, data) => {
  if (err) {
    console.error("读取文件出错：", err);
    return;
  }
  passage = data;
});
// 问答
const qa = () => {
  rl.question("please input the question>:", async (str) => {
    if (!str) {
      qa();
      return;
    }
    const answers = await model.findAnswers(str, passage);
    console.log(answers);
    qa();
  });
};
//加载模型
const init = async () => {
  model = await qna.load({
    fromTFHub: false,
    modelUrl: "http://your address/mobilebert_1/model.json",
  });
  qa();
};
init();


