import React, { useState, useEffect } from "react";
import { fetchFilterData } from "../apis/perfume.api";

const FilterSidebar = ({ searchParams, setSearchParams, setIsMobileFilterOpen }) => {
    // Collection metrics from your API handler
    const [availableBrands, setAvailableBrands] = useState([]);
    const [absoluteBounds, setAbsoluteBounds] = useState({ min: 0, max: 25000 });
    const [loading, setLoading] = useState(true);

    // Local state controls for handling updates before hitting "Apply"
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 25000 });

    // Tracking state to solve overlay handle blocking bug
    const [activeThumb, setActiveThumb] = useState("");

    // 1. Fetch live metadata ONCE when the component mounts
    useEffect(() => {
        const getMetadata = async () => {
            try {
                const response = await fetchFilterData();
                const targetData = response?.data || response;

                if (targetData) {
                    const { brands, priceBounds } = targetData;
                    setAvailableBrands(brands || []);
                    setAbsoluteBounds(priceBounds || { min: 0, max: 25000 });

                    // Sync local slider values with the active URL parameters on load
                    const urlBrands = searchParams.get("brand")
                        ? searchParams.get("brand").split(",")
                        : [];
                    const urlMin = Number(searchParams.get("minPrice")) || priceBounds?.min || 0;
                    const urlMax =
                        Number(searchParams.get("maxPrice")) || priceBounds?.max || 25000;

                    setSelectedBrands(urlBrands);
                    setPriceRange({ min: urlMin, max: urlMax });
                }
            } catch (err) {
                console.error("Failed fetching sidebar filter structural metadata:", err);
            } finally {
                setLoading(false);
            }
        };
        getMetadata();
    }, []);

    // Sync checkboxes locally
    const handleBrandCheckboxChange = (brand, isChecked) => {
        if (isChecked) {
            setSelectedBrands([...selectedBrands, brand]);
        } else {
            setSelectedBrands(selectedBrands.filter((b) => b !== brand));
        }
    };

    // Sync dual slider handles locally
    const handlePriceSliderChange = (e, target) => {
        const value = Number(e.target.value);

        setPriceRange((prev) => {
            if (target === "min") {
                return {
                    ...prev,
                    min: Math.min(value, prev.max - 100),
                };
            }

            return {
                ...prev,
                max: Math.max(value, prev.min + 100),
            };
        });
    };

    // 2. Commit local choices directly to the global URL search parameters
    const applyFilters = () => {
        const params = new URLSearchParams(searchParams);

        params.set("page", "1");

        // Brand filter
        if (selectedBrands.length > 0) {
            params.set("brand", selectedBrands.join(","));
        } else {
            params.delete("brand");
        }

        // Price filter
        if (priceRange.min > absoluteBounds.min) {
            params.set("minPrice", priceRange.min.toString());
        } else {
            params.delete("minPrice");
        }

        if (priceRange.max < absoluteBounds.max) {
            params.set("maxPrice", priceRange.max.toString());
        } else {
            params.delete("maxPrice");
        }

        setSearchParams(params);

        if (setIsMobileFilterOpen) {
            setIsMobileFilterOpen(false);
        }
    };

    const clearAllFilters = () => {
        setSelectedBrands([]);
        setPriceRange({ min: absoluteBounds.min, max: absoluteBounds.max });
        setSearchParams(new URLSearchParams());
        if (setIsMobileFilterOpen) setIsMobileFilterOpen(false);
    };

    if (loading) {
        return (
            <div className="text-sm font-medium text-center py-8 text-secondary-black font-secondary animate-pulse">
                Loading Filters...
            </div>
        );
    }

    return (
        <div className="space-y-8 bg-primary-white p-6 rounded-2xl border border-beige-light max-w-xs w-full shadow-sm">
            {/* Brands Option Column Wrapper */}
            <div>
                <h3 className="font-bold text-primary-black text-base mb-4 font-primary tracking-wide">
                    House / Brand
                </h3>
                <div className="space-y-3 max-h-52 overflow-y-auto pr-2 font-secondary text-sm text-secondary-black custom-scrollbar">
                    {availableBrands.map((brand) => (
                        <label
                            key={brand}
                            className="flex items-center gap-3 cursor-pointer group select-none"
                        >
                            <input
                                type="checkbox"
                                checked={selectedBrands.includes(brand)}
                                onChange={(e) => handleBrandCheckboxChange(brand, e.target.checked)}
                                className="w-4 h-4 rounded border-beige-light text-green-dark focus:ring-green-dark cursor-pointer accent-green-dark transition-all"
                            />
                            <span className="group-hover:text-primary-black transition-colors font-medium">
                                {brand}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Interactive Range Track Slider mapped to light blue accent */}
            <div>
                <h3 className="font-bold text-primary-black text-base mb-4 font-primary tracking-wide">
                    Price Range
                </h3>

                <div className="space-y-4 font-secondary">
                    <div className="relative h-8">
                        {/* Background Track */}
                        <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-secondary-white rounded-full" />

                        {/* Active Range */}
                        <div
                            className="absolute top-1/2 -translate-y-1/2 h-2 bg-blue-400/90 rounded-full"
                            style={{
                                left: `${
                                    ((priceRange.min - absoluteBounds.min) /
                                        (absoluteBounds.max - absoluteBounds.min)) *
                                    100
                                }%`,
                                width: `${
                                    ((priceRange.max - priceRange.min) /
                                        (absoluteBounds.max - absoluteBounds.min)) *
                                    100
                                }%`,
                            }}
                        />

                        {/* Min Slider */}
                        <input
                            type="range"
                            min={absoluteBounds.min}
                            max={absoluteBounds.max}
                            value={priceRange.min}
                            onChange={(e) => handlePriceSliderChange(e, "min")}
                            className="range-slider absolute w-full top-1/2 -translate-y-2"
                        />

                        {/* Max Slider */}
                        <input
                            type="range"
                            min={absoluteBounds.min}
                            max={absoluteBounds.max}
                            value={priceRange.max}
                            onChange={(e) => handlePriceSliderChange(e, "max")}
                            className="range-slider absolute w-full top-1/2 -translate-y-2"
                        />
                    </div>

                    <div className="flex justify-between text-xs font-semibold">
                        <span>₹{priceRange.min.toLocaleString("en-IN")}</span>
                        <span>₹{priceRange.max.toLocaleString("en-IN")}</span>
                    </div>
                </div>
            </div>

            {/* Button Interface Controls */}
            <div className="flex items-center gap-2 pt-2 border-t border-secondary-white">
                <button
                    type="button"
                    onClick={clearAllFilters}
                    className="w-1/3 py-2.5 bg-secondary-white hover:bg-beige-light/20 text-secondary-black rounded-xl font-medium text-xs uppercase tracking-wider transition-all duration-150 cursor-pointer text-center border border-beige-light font-primary"
                >
                    Clear
                </button>
                <button
                    type="button"
                    onClick={applyFilters}
                    className="w-2/3 py-2.5 bg-green-dark hover:bg-green-light text-primary-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-150 cursor-pointer text-center shadow-sm font-primary"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default FilterSidebar;
