import { Context, helpers } from "../../deps.ts";
import type { Color } from "../types/color.ts";
import * as db from "../db/colorDb.ts";

export const findColor = async (ctx: Context) => {
  try {
    const colors: Color[] = await db.findColors();
    ctx.response.body = colors;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};

export const createColor = async (ctx: Context) => {
  try {
    const data = await ctx.request.body().value;
    const {code} = JSON.parse(data)
    const createdColor: Color = await db.createColor(code);
    console.log(createdColor)
    ctx.response.body = createdColor;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { msg: err.message };
  }
};

export const pageColor = async (ctx: Context) => {
  try {
    ctx.response.body = `
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Colores</title>
          <style>
            body {
              background: black;
              color: white;
            }
            ul {
              list-style: none;
              display: flex;
              flex-wrap: wrap;
              gap: 20px;
            }
            li {
              font-weight: bold;
              font-size: 20px;
            }
            li span {
              display: block;
              width: 100px;
              height: 50px;
            }
          </style>
        </head>
        <body>
          <h1>Selecciona un color</h1>
          <input type="color" id="colorInput">
          <ul id="colorList">
            <li>No tiene colores</li>
          </ul>
        </body>
        <script>
          const colorInput = document.getElementById("colorInput");
          const colorList = document.getElementById("colorList");
          colorInput.addEventListener('change', (e) => {
            const code = e.target.value
            fetch('http://localhost:8080/api/colors', {
              method: 'POST',
              body: JSON.stringify({code})
            })

            fetch('http://localhost:8080/api/colors')
              .then(res => res.json())
              .then(data => {
                if(Array.isArray(data) && data.length > 0) {
                  let dataHtml = ""
                  data.forEach(item => {
                    dataHtml += '<li style="color:'+ item.code+'">' + item.code + '<span style="background:'+ item.code +'"></span></li>'
                  })
                  colorList.innerHTML = dataHtml
                }
              })

          })
        </script>
      </html>
    ` 
    ctx.response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Accept');
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};
