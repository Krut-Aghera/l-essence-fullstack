import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Input';
import Button from '../Button';
import { registerPerfume } from '../../apis/perfume.api';
import { useNavigate } from 'react-router-dom';
import { showCustomToast, showErrorToast, showLoadingToast, showSuccessToast } from '../../utils/hotToast';


export default function PerfumeRegistration() {
      const [isSubmitting, setIsSubmitting] = useState(false);
      const navigate = useNavigate()

      const {
            register,
            handleSubmit,
            reset,
            formState: { errors }
      } = useForm();

      const registerPerfumeHandler = async (data) => {
            setIsSubmitting(true);

            const toastId = showLoadingToast("Registering perfume...");

            try {
                  const formData = new FormData();

                  const price = Number(data.price);
                  const discount = Number(data.discount) || 0;

                  let oldPrice;

                  // If discount exists, calculate original price from selling price
                  if (discount > 0) {
                        oldPrice = Math.round(price / (1 - discount / 100));
                  } else {
                        // Add ₹499 when no discount is provided
                        oldPrice = price + 499;
                  }

                  // Basic fields
                  formData.append("name", data.name.trim());
                  formData.append("brand", data.brand.trim());
                  formData.append("category", data.category.trim());

                  formData.append("price", price);
                  formData.append("oldPrice", oldPrice);
                  formData.append("discount", discount);
                  formData.append("inStock", Number(data.inStock));

                  formData.append("gender", data.gender);
                  formData.append("concentration", data.concentration);
                  formData.append("size", data.size.trim());

                  // Notes
                  formData.append("notes[top]", data.top.trim());
                  formData.append("notes[heart]", data.heart.trim());
                  formData.append("notes[base]", data.base.trim());

                  // Images
                  if (data.images?.length) {
                        Array.from(data.images).forEach((file) => {
                              formData.append("images", file);
                        });
                  }

                  const response = await registerPerfume(formData);

                  showSuccessToast("Perfume registered successfully", toastId);
                  showCustomToast("New Perfume Added ✨", `${response?.data?.name || "Perfume"} is now available in the catalog`);

                  reset();
                  navigate(`/perfume/${response?.data?._id}`);

            } catch (error) {
                  showErrorToast("Failed to register perfume", toastId);
                  console.log(error.response);
            } finally {
                  setIsSubmitting(false);
            }
      };

      return (
            <div className="h-screen w-screen flex items-center justify-center bg-secondary-white p-4 sm:p-6 md:p-8 overflow-hidden">

                  {/* Main Form Dashboard Container */}
                  <div className="w-full max-w-5xl h-[95vh] sm:h-[88vh] max-h-200 bg-primary-white rounded-2xl border border-beige-light shadow-md overflow-hidden flex flex-col">

                        <form
                              onSubmit={handleSubmit(registerPerfumeHandler)}
                              className="h-full w-full p-6 sm:p-10 bg-primary-white flex flex-col justify-center overflow-hidden"
                        >
                              {/* Header Message Block */}
                              <div className="mb-6 space-y-1 text-center md:text-left shrink-0">
                                    <h2 className="font-primary text-2xl lg:text-3xl font-bold tracking-tight text-primary-black">
                                          Add New Fragrance
                                    </h2>
                                    <p className="text-xs sm:text-sm font-secondary text-secondary-black">
                                          Introduce a new scent profile, pricing tier, and inventory count to the database.
                                    </p>
                              </div>

                              {/* Scrollable Form Body - Splitting into 2 columns on desktop (md:) */}
                              <div className="grow overflow-y-auto pr-1 custom-scrollbar py-1">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                                          {/* LEFT COLUMN: Identity, Logistics & Pricing Matrix */}
                                          <div className="space-y-4">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                      <Input
                                                            type="text"
                                                            label="Perfume Name"
                                                            placeholder="e.g. Mystique Bouquet"
                                                            error={errors.name ? errors.name.message : null}
                                                            {...register("name", { required: "Perfume name is required" })}
                                                      />
                                                      <Input
                                                            type="text"
                                                            label="Brand / House"
                                                            placeholder="e.g. AFNAN"
                                                            error={errors.brand ? errors.brand.message : null}
                                                            {...register("brand", { required: "Brand is required" })}
                                                      />
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                      <Input
                                                            type="text"
                                                            label="Scent Family / Category"
                                                            placeholder="e.g. Floral & Fruity Citrus"
                                                            error={errors.category ? errors.category.message : null}
                                                            {...register("category", { required: "Category is required" })}
                                                      />

                                                      {/* Refactored Gender Radio Button Layout Block */}
                                                      <div className="flex flex-col gap-1.5 w-full">
                                                            <label className="text-xs font-bold tracking-wide text-primary-black uppercase font-secondary">
                                                                  Target Gender
                                                            </label>
                                                            <div className="grid grid-cols-3 gap-2 h-9.5">
                                                                  {['male', 'female', 'unisex'].map((genderOption) => (
                                                                        <label
                                                                              key={genderOption}
                                                                              className={`flex items-center justify-center gap-2 px-2 text-xs font-semibold bg-primary-white border ${errors.gender ? 'border-red-600' : 'border-beige-light/80 hover:border-beige-dark'
                                                                                    } rounded-xl cursor-pointer select-none capitalize text-primary-black transition-colors`}
                                                                        >
                                                                              <input
                                                                                    type="radio"
                                                                                    value={genderOption}
                                                                                    className="accent-primary-black cursor-pointer w-3.5 h-3.5"
                                                                                    {...register("gender", { required: "Gender profile is required" })}
                                                                              />
                                                                              {genderOption}
                                                                        </label>
                                                                  ))}
                                                            </div>
                                                            {errors.gender && (
                                                                  <p className="text-[11px] font-semibold text-red-600 font-secondary mt-0.5">
                                                                        ⚠️ {errors.gender.message}
                                                                  </p>
                                                            )}
                                                      </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                      <Input
                                                            type="text"
                                                            label="Bottle Size"
                                                            placeholder="e.g. 100ml"
                                                            error={errors.size ? errors.size.message : null}
                                                            {...register("size", { required: "Fluid volume size is required" })}
                                                      />

                                                      <div className="flex flex-col gap-1.5 w-full">
                                                            <label className="text-xs font-bold tracking-wide text-primary-black uppercase font-secondary">
                                                                  Concentration
                                                            </label>
                                                            <select
                                                                  className={`w-full px-3 py-2.5 text-xs font-semibold bg-primary-white border ${errors.concentration ? 'border-red-600' : 'border-beige-light/80 hover:border-beige-dark'
                                                                        } text-primary-black rounded-xl outline-none transition-colors duration-200 cursor-pointer h-9.5`}
                                                                  {...register("concentration", { required: "Concentration is required" })}
                                                            >
                                                                  <option value="">Select configuration...</option>
                                                                  <option value="Eau Fraîche">Eau Fraîche</option>
                                                                  <option value="Eau de Cologne">Eau de Cologne</option>
                                                                  <option value="Eau de Toilette">Eau de Toilette</option>
                                                                  <option value="Eau de Parfum">Eau de Parfum</option>
                                                                  <option value="Parfum">Parfum</option>
                                                                  <option value="Extrait de Parfum">Extrait de Parfum</option>
                                                                  <option value="Elixir">Elixir</option>
                                                            </select>
                                                            {errors.concentration && (
                                                                  <p className="text-[11px] font-semibold text-red-600 font-secondary mt-0.5">
                                                                        ⚠️ {errors.concentration.message}
                                                                  </p>
                                                            )}
                                                      </div>
                                                </div>

                                                <div className="grid grid-cols-3 gap-3 bg-secondary-white/50 p-3 rounded-xl border border-beige-light/60">
                                                      <div>
                                                            <Input
                                                                  type="number"
                                                                  label="Price ($)"
                                                                  placeholder="85.00"
                                                                  error={errors.price ? errors.price.message : null}
                                                                  {...register("price", { required: "Required" })}
                                                            />
                                                      </div>
                                                      <div>
                                                            <Input
                                                                  type="number"
                                                                  label="Discount (%)"
                                                                  placeholder="22"
                                                                  error={errors.discount ? errors.discount.message : null}
                                                                  {...register("discount")}
                                                            />
                                                      </div>
                                                </div>

                                                <Input
                                                      type="number"
                                                      label="Stock Quantity (Inventory)"
                                                      placeholder="e.g. 50"
                                                      error={errors.inStock ? errors.inStock.message : null}
                                                      {...register("inStock", {
                                                            required: "Stock configuration is required",
                                                            min: { value: 0, message: "Stock cannot be negative" }
                                                      })}
                                                />
                                          </div>

                                          {/* RIGHT COLUMN: Olfactory Pyramid & Asset Media Dropzone */}
                                          <div className="space-y-4">
                                                <div className="bg-secondary-white/30 p-4 rounded-xl border border-beige-light/40 space-y-3">
                                                      <h3 className="text-[11px] font-bold text-primary-black tracking-wider uppercase font-secondary opacity-70">
                                                            Fragrance Notes Pyramid
                                                      </h3>
                                                      <Input
                                                            type="text"
                                                            label="Top"
                                                            placeholder="e.g. Bergamot, Grapefruit"
                                                            error={errors.top ? errors.top.message : null}
                                                            {...register("top", { required: "Top notes are required" })}
                                                      />
                                                      <Input
                                                            type="text"
                                                            label="Heart"
                                                            placeholder="e.g. Jasmine, Pink Pepper"
                                                            error={errors.heart ? errors.heart.message : null}
                                                            {...register("heart", { required: "Heart notes are required" })}
                                                      />
                                                      <Input
                                                            type="text"
                                                            label="Base Notes"
                                                            placeholder="e.g. Amber, Cedarwood, Musk"
                                                            error={errors.base ? errors.base.message : null}
                                                            {...register("base", { required: "Base notes are required" })}
                                                      />
                                                </div>

                                                <div className="flex flex-col gap-1.5 w-full">
                                                      <label className="text-xs font-bold tracking-wide text-primary-black uppercase font-secondary">
                                                            Product Image Galleries
                                                      </label>

                                                      <div className="relative group border-2 border-dashed border-beige-light/80 hover:border-beige-dark bg-secondary-white/40 rounded-xl p-5 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer min-h-33.75">
                                                            <input
                                                                  type="file"
                                                                  multiple
                                                                  accept="image/*"
                                                                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                                  {...register("images", {
                                                                        required: "Uploading assets is required",
                                                                        validate: {
                                                                              minFiles: (files) => !files || files.length >= 3 || "Upload at least 3 images",
                                                                              maxFiles: (files) => !files || files.length <= 5 || "Maximum 5 images allowed"
                                                                        }
                                                                  })}
                                                            />

                                                            <svg className="w-7 h-7 text-beige-dark/60 group-hover:text-beige-dark mb-1.5 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>

                                                            <p className="text-xs font-semibold text-secondary-black text-center font-primary">
                                                                  <span className="text-beige-dark group-hover:text-beige-accent underline underline-offset-2 transition-colors">Click to select assets</span> or drag drop media
                                                            </p>
                                                            <p className="text-[10px] text-secondary-black/50 font-secondary mt-1 text-center">
                                                                  Accepts JPEG, PNG, WEBP (Batch limit: 3 to 5 images)
                                                            </p>
                                                      </div>

                                                      {errors.images && (
                                                            <p className="text-xs font-semibold text-red-600 mt-1 font-secondary">
                                                                  ⚠️ {errors.images.message}
                                                            </p>
                                                      )}
                                                </div>
                                          </div>

                                    </div>
                              </div>

                              {/* Action Footer Submit Block */}
                              <div className="pt-4 shrink-0 mt-4 border-t border-beige-light/30">
                                    <Button
                                          type="submit"
                                          disabled={isSubmitting}
                                          child={isSubmitting ? "Processing Upload..." : "Publish Fragrance to Catalog"}
                                          colorSchema={isSubmitting ? "bg-beige-dark text-primary-white cursor-not-allowed opacity-75" : "bg-primary-black hover:bg-green-dark text-primary-white shadow-sm"}
                                          className="w-full py-3 rounded-xl transition-all font-secondary font-bold text-xs tracking-wider uppercase"
                                    />
                              </div>

                        </form>

                  </div>
            </div>
      );
}