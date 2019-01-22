import Mock from "mockjs";
// Mock.mock(/\/todoList.mock/, {
let category = [
  "美食",
  "早餐",
  "商超便利",
  "水果",
  "医药健康",
  "鲜花绿植",
  "厨房生鲜",
  "跑腿代购",
  "甜品饮品",
  "签到领红包",
  "地方菜系",
  "麻辣烫",
  "速食简餐",
  "地方小吃",
  "大牌惠吃",
  "米粉面馆",
  "包子粥店",
  "炸鸡炸串",
  "汉堡披萨",
  "鸭脖卤味"
];
let categoryImg = [
  "https://fuss10.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg",
  "https://fuss10.elemecdn.com/1/48/bf1a859bf81553bbcfd6cf4ac42cbjpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
  "https://fuss10.elemecdn.com/c/7e/76a23eb90dada42528bc41499d6f8jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
  "https://fuss10.elemecdn.com/0/d0/dd7c960f08cdc756b1d3ad54978fdjpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
  "https://fuss10.elemecdn.com/7/0a/af108e256ebc9f02db599592ae655jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
  "https://fuss10.elemecdn.com/3/01/c888acb2c8ba9e0c813f36ec9e90ajpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
  "https://fuss10.elemecdn.com/c/21/e42997b86b232161a5a16ab813ae8jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
  "https://fuss10.elemecdn.com/e/58/bceb19258e3264e64fb856722c3c1jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
  "https://fuss10.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
  "https://fuss10.elemecdn.com/5/de/bebe83947afee0b0f38257b0e3866jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
  "https://fuss10.elemecdn.com/a/8a/ec21096d528b7cfd23cdd894f01c6jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
  "https://fuss10.elemecdn.com/e/c7/b7ba9547aa700bd20d0420e1794a8jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
  "https://fuss10.elemecdn.com/e/c7/b7ba9547aa700bd20d0420e1794a8jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
  "https://fuss10.elemecdn.com/7/d6/6f2631288a44ec177204e05cbcb93jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
  "https://fuss10.elemecdn.com/a/7b/b02bd836411c016935d258b300cfejpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
  "https://fuss10.elemecdn.com/e/89/185f7259ebda19e16123884a60ef2jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
  "https://fuss10.elemecdn.com/5/1a/dc885d2ce022d2ee60495acafb795jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
  "https://fuss10.elemecdn.com/a/78/0fb469b2da210827ec16896e00420jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
  "https://fuss10.elemecdn.com/b/7f/432619fb21a40b05cd25d11eca02djpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
  "https://fuss10.elemecdn.com/b/70/9fd298fa84d49748984e082777e90jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/"
];

Mock.mock(/\/shopping\/v2\/entries.mock/, {
  code: 1000,
  data: {
    "list|20": [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        "id|+1": 1,
        "name|+1": category,
        "image|+1": categoryImg
      }
    ]
  },
  message: "",
  systemDate: new Date().getTime()
});

Mock.mock(/\/shopping\/v2\/recommend.mock/, {
  code: 1000,
  data: {
    list: [
      {
        id: 1,
        name: "限量抢购",
        description: "超值美味 9.9元起",
        third_title: "4192人",
        name_color: "#e81919",
        third_color: "#e81919",
        third_desc: "正在抢 >",
        img:
          "https://fuss10.elemecdn.com/d/d4/16ff085900d62b8d60fa7e9c6b65dpng.png?imageMogr/format/webp/thumbnail/!240x160r/gravity/Center/crop/240x160/"
      },
      {
        id: 2,
        name: "品质套餐",
        description: "搭配齐全吃得好",
        third_title: "立即抢购 >",
        name_color: "",
        third_color: "#af8260",
        third_desc: "",
        img:
          "https://fuss10.elemecdn.com/b/e1/0fa0ed514c093a7138b0b9a50d61fpng.png?imageMogr/format/webp/thumbnail/!240x160r/gravity/Center/crop/240x160/"
      }
    ]
  },
  message: "",
  systemDate: new Date().getTime()
});

let banners = [
  "https://fuss10.elemecdn.com/2/d4/b964b9fa5a90ab798fc7531d1c7bejpeg.jpeg?imageMogr/format/webp/thumbnail/568x/",
  "https://fuss10.elemecdn.com/5/f7/a2271e4d2f1ccb925ad84dfd4edffjpeg.jpeg?imageMogr/format/webp/thumbnail/568x/",
  "https://fuss10.elemecdn.com/7/90/8012dcb83434050f0363316f24809jpeg.jpeg?imageMogr/format/webp/thumbnail/568x/",
  "https://fuss10.elemecdn.com/d/f5/456ea6285819f7932d8606bffeb35jpeg.jpeg?imageMogr/format/webp/thumbnail/568x/"
];

Mock.mock(/\/shopping\/v2\/banners.mock/, {
  code: 1000,
  data: {
    "list|2-4": [
      {
        "id|+1": 1,
        "img|+1": banners
      }
    ]
  },
  message: "",
  systemDate: new Date().getTime()
});

Mock.mock(/\/shopping\/v2\/restaurants.mock/, {
  code: 1000,
  data: {
    "list|10": [
      {
        "id|+1": 1,
        name: "@ctitle",
        image: "@image('130x130')",
        "rating|1-5.1": 1,
        "recent_order_num|1-2000": 1,
        "float_minimum_order_amount|0-50": 1,
        "float_delivery_fee|0-10": 1,
        "distance|1-2000": 1,
        "order_lead_time|1-40": 1,
        "support_tags|1-2": [{ "id|+1": 1, name: "@ctitle(3,4)" }],
        recommend: {
          color: "#e8470b",
          reason: "口碑人气好店",
          image: "@image('20x20','#e8470b')"
        },
        "activities|1-5": [
          {
            "id|+1": 199999,
            icon_name: "减",
            tips: "@ctitle()",
            icon_color: "f07373",
            description: "@csentence(5, 20)"
          }
        ],
        "supports|1-2": [
          {
            icon_name: "保",
            "id|+1": 1,
            tips: "@ctitle()",
            icon_color: "999999",
            description: "@csentence(5, 20)"
          }
        ]
      }
    ]
  },
  message: "",
  systemDate: new Date().getTime()
});
