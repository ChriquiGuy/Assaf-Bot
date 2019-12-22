"use strict";

// Link to dooron page
const DooronTemplate = {
  messages: [
    "אני חושב שהתבלבלת, אני אסף לא דורון",
    "אם אתה מחפש דירה אני מציע לך לדבר עם חבר שלי דורון, הוא יעזור לך למצוא את דירת החולמות שלך"
  ],
  templateMessage: {
    template_type: "generic",
    elements: [
      {
        title: "Dooron - דורון חיפוש דירות",
        image_url:
          "https://scontent.ftlv5-1.fna.fbcdn.net/v/t1.0-9/49938853_348490665881339_2798763413499543552_n.png?_nc_cat=101&_nc_oc=AQkELNTKCDNF140YxnMLh-UIzqr_mJmUuFpuI7T2dIKZkXr3JWTe6lkBK77TAAaFpBg&_nc_ht=scontent.ftlv5-1.fna&oh=aff791450ba95a804e21f83eae3792e1&oe=5EB2ADD3",
        subtitle: "מוצא לך דירה בתל אביב",
        default_action: {
          type: "web_url",
          url: "https://www.facebook.com/dorontlv",
          webview_height_ratio: "tall"
        },
        buttons: [
          {
            type: "web_url",
            url: "https://www.facebook.com/dorontlv",
            title: "שלח הודעה לדורון!"
          }
        ]
      }
    ]
  },
  actions: [undefined]
};

exports.DooronTemplate;
