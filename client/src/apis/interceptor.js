import apiClient from "./axios";
import { refreshToken } from "./auth.api";


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error = null) => {
      failedQueue.forEach((promise) => {
            if (error) {
                  promise.reject(error);
            } else {
                  promise.resolve();
            }
      });

      failedQueue = [];
};

export const setupInterceptors = (store) => {
      apiClient.interceptors.response.use(

            (response) => response,

            async (error) => {

                  const originalRequest = error.config;

                  const shouldRefresh =
                        error.response?.status === 401 &&
                        !originalRequest._retry;


                  if (shouldRefresh) {

                        originalRequest._retry = true;

                        if (isRefreshing) {

                              return new Promise((resolve, reject) => {

                                    failedQueue.push({
                                          resolve,
                                          reject,
                                    });

                              }).then(() => apiClient(originalRequest));

                        }

                        isRefreshing = true;

                        try {

                              await refreshToken();
                              
                              processQueue();
                              console.log("new token is being generated")
                              
                              return apiClient(originalRequest);

                        } catch (refreshError) {

                              processQueue(refreshError);

                              store.dispatch(
                                    authstate__logout()
                              );

                              window.location.href = "/login";

                              return Promise.reject(refreshError);

                        } finally {

                              isRefreshing = false;

                        }
                  }

                  return Promise.reject(error);
            }
      );
};