import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const CartItemSkeleton = () => {
    return (
        <div className="w-full h-auto md:h-28 border border-secondary-white rounded-xl p-3 flex flex-col md:flex-row items-center gap-4">
            {/* Image */}
            <Skeleton
                className="rounded-lg shrink-0"
                width={80}
                height={80}
                baseColor="#e0e0e0"
                highlightColor="#f5f5f5"
            />

            {/* Content */}
            <div className="flex-1 w-full flex justify-between items-center">
                <div className="space-y-2">
                    <Skeleton width={70} height={10} />
                    <Skeleton width={180} height={16} />
                    <Skeleton width={100} height={12} />
                </div>

                <div className="flex items-center gap-6">
                    <div>
                        <Skeleton width={60} height={12} />
                        <Skeleton width={80} height={18} />
                    </div>

                    <Skeleton width={90} height={32} />

                    <Skeleton circle width={32} height={32} />
                </div>
            </div>
        </div>
    );
};

export default CartItemSkeleton;
