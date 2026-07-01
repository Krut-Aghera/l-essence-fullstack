import Mailgen from "mailgen";

const mailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: `${process.env.APP_NAME}`,
        link: `${process.env.CLIENT_URL}`,
    },
});

export { mailGenerator };
