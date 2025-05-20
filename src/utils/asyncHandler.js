import { ApiResponse } from "./ApiResponse.js";

const asyncHandler = (requestHnadler) => {
  return (req, next) => {
    Promise.resolve(requestHnadler(req, res, next)).catch((err) => {
      return next(
        res.status(err.statusCode).json({
          ...err,
          message: err.message,
        })
      );
    });
  };
};

export { asyncHandler };

// const asyncHandler = (fn) => async (req , res , next) =>{
//     try {
//         await fn(req,res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }
