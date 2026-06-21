import toast from "react-hot-toast";

export const showLoadingToast = (message) => {
      return toast.loading(message);
};

export const showSuccessToast = (message, toastId = null) => {
      toast.success(message, {
            id: toastId,
            duration: 3000,
      });
};

export const showErrorToast = (message, toastId = null) => {
      toast.error(message, {
            id: toastId,
            duration: 2000,
      });
};

export const showCustomToast = (title, description = "") => {
      toast.custom((t) => (
            <div
                  className={`bg-primary-white border border-secondary-white shadow-lg rounded-2xl px-4 py-3 min-w- transition-all duration-300
                        ${t.visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
                  <h4 className="font-bold text-primary-black">
                        {title}
                  </h4>

                  {description && (
                        <p className="text-xs text-secondary-black mt-1">
                              {description}
                        </p>
                  )}
            </div>
      ));
};