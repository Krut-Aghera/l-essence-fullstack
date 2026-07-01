const logger = (req, res, next) => {
    console.log(`METHOD : ${req.method}  || URL : ${req.url}`);
    next();
};

export default logger;
