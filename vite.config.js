import {
  defineConfig,
  loadEnv,
} from "vite";

import react from
  "@vitejs/plugin-react";


function judgingDevApi(
  scriptUrl
) {
  return {
    name:
      "tezhack-judging-api",

    configureServer(server) {

      server.middlewares.use(
        "/api/judging",
        (req, res) => {

          if (
            req.method !== "POST"
          ) {
            res.statusCode = 405;

            res.setHeader(
              "Content-Type",
              "application/json"
            );

            res.end(
              JSON.stringify({
                ok: false,
                error:
                  "Method not allowed.",
              })
            );

            return;
          }


          let body = "";


          req.on(
            "data",
            (chunk) => {
              body += chunk;
            }
          );


          req.on(
            "end",
            async () => {

              try {

                if (!scriptUrl) {
                  throw new Error(
                    "JUDGING_APPS_SCRIPT_URL is missing."
                  );
                }


                const response =
                  await fetch(
                    scriptUrl,
                    {
                      method:
                        "POST",

                      headers: {
                        "Content-Type":
                          "text/plain;charset=utf-8",
                      },

                      body,

                      redirect:
                        "follow",
                    }
                  );


                const text =
                  await response.text();


                JSON.parse(text);


                res.statusCode =
                  200;

                res.setHeader(
                  "Content-Type",
                  "application/json"
                );

                res.end(text);

              } catch (error) {

                console.error(
                  "Judging API error:",
                  error
                );


                res.statusCode =
                  500;

                res.setHeader(
                  "Content-Type",
                  "application/json"
                );

                res.end(
                  JSON.stringify({
                    ok: false,
                    error:
                      error.message ||
                      "Judging API error.",
                  })
                );
              }

            }
          );

        }
      );

    },
  };
}


export default defineConfig(
  ({ mode }) => {

    const env =
      loadEnv(
        mode,
        process.cwd(),
        ""
      );


    return {
      plugins: [
        react(),

        judgingDevApi(
          env
            .JUDGING_APPS_SCRIPT_URL
        ),
      ],
    };
  }
);