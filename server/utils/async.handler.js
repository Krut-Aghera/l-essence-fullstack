const asyncHandler = (fn) => {
    const asyncController = (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

    return asyncController;
};

export default asyncHandler;
