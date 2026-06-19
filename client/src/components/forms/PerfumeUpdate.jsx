import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../Input';
import Button from '../Button';
import { fetchPerfumeById, updatePerfume } from '../../apis/perfume.api';
import { showErrorToast, showLoadingToast, showSuccessToast } from '../../utils/hotToast';

export default function PerfumeUpdate() {
      const { id } = useParams();
      const navigate = useNavigate();
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [existingImages, setExistingImages] =
            useState([]);

      const [newFiles, setNewFiles] = useState([]);

      const CONCENTRATION_MAP = {
            "eau fraîche": "Eau Fraîche",
            "eau fraiche": "Eau Fraîche",
            "eau de cologne": "Eau de Cologne",
            "eau de toilette": "Eau de Toilette",
            "eau de parfum": "Eau de Parfum",
            "parfum": "Parfum",
            "extrait de parfum": "Extrait de Parfum",
            "elixir": "Elixir"
      };

      const [deletedIds, setDeletedIds] =
            useState([]);


      const {
            register,
            handleSubmit,
            setValue,
            formState: { errors }
      } = useForm({
            defaultValues: {
                  discount: 0
            }
      });


      const totalImages =
            existingImages.length +
            newFiles.length;

      // Fetch initial data
      useEffect(() => {
            const fetchPerfume = async () => {
                  try {
                        const response = await fetchPerfumeById(id);


                        // Fill all simple fields
                        Object.keys(response.data).forEach((key) => {
                              if (
                                    key !== "notes" &&
                                    key !== "images" &&
                                    key !== "concentration"
                              ) {
                                    setValue(key, response.data[key]);
                              }
                        });

                        // Fill concentration separately
                        setValue(
                              "concentration",
                              CONCENTRATION_MAP[
                              response.data.concentration?.toLowerCase()
                              ] || response.data.concentration
                        );

                        // Fill notes separately
                        setValue("top", response.data.notes?.top || "");
                        setValue("heart", response.data.notes?.heart || "");
                        setValue("base", response.data.notes?.base || "");

                        // Images
                        setExistingImages(response.data.images || []);

                  } catch (error) {
                        console.error(error);
                        showErrorToast("Failed to load perfume data");
                  }
            };

            fetchPerfume();
      }, [id, setValue]);


      useEffect(() => {

            return () => {

                  newFiles.forEach(fileObj => {
                        URL.revokeObjectURL(
                              fileObj.preview
                        );
                  });

            };

      }, [newFiles]);


      const handleFileChange = (e) => {

            const files = Array.from(e.target.files);

            const availableSlots =
                  5 - existingImages.length - newFiles.length;


            if (availableSlots <= 0) {
                  return showErrorToast(
                        "Maximum 5 images allowed"
                  );
            }

            if (files.length > availableSlots) {
                  return showErrorToast(
                        `You can add only ${availableSlots} more image(s)`
                  );
            }

            const filesWithPreview = files.map(file => ({
                  file,
                  preview: URL.createObjectURL(file)
            }));

            setNewFiles(prev => [
                  ...prev,
                  ...filesWithPreview
            ]);

            e.target.value = "";
      };

      const removeExisting = (publicId) => {

            setDeletedIds(prev => [
                  ...prev,
                  publicId
            ]);

            setExistingImages(prev =>
                  prev.filter(
                        img => img.public_id !== publicId
                  )
            );
      };

      const removeNewFile = (index) => {
            URL.revokeObjectURL(
                  newFiles[index].preview
            );

            setNewFiles(prev =>
                  prev.filter((_, i) => i !== index)
            );
      };


      const onSubmit = async (data) => {

            if (totalImages < 3) {
                  return showErrorToast(
                        "Please ensure at least 3 images are present"
                  );
            }

            setIsSubmitting(true);

            const toastId =
                  showLoadingToast("Updating perfume...");

            try {

                  const formData = new FormData();

                  const price = Number(data.price);
                  const discount =
                        Number(data.discount) || 0;

                  const oldPrice =
                        discount > 0
                              ? Math.round(
                                    price /
                                    (1 -
                                          discount /
                                          100)
                              )
                              : price + 499;

                  formData.append("name", data.name);
                  formData.append("brand", data.brand);
                  formData.append("category", data.category);

                  formData.append("price", price);
                  formData.append("oldPrice", oldPrice);
                  formData.append("discount", discount);

                  formData.append(
                        "inStock",
                        Number(data.inStock)
                  );

                  formData.append("size", data.size);
                  formData.append("gender", data.gender);

                  formData.append(
                        "concentration",
                        data.concentration
                  );

                  formData.append(
                        "notes[top]",
                        data.top
                  );

                  formData.append(
                        "notes[heart]",
                        data.heart
                  );

                  formData.append(
                        "notes[base]",
                        data.base
                  );

                  formData.append(
                        "existingImages",
                        JSON.stringify(existingImages)
                  );

                  formData.append(
                        "deletedPublicIds",
                        JSON.stringify(deletedIds)
                  );

                  newFiles.forEach(fileObj => {
                        formData.append(
                              "images",
                              fileObj.file
                        );
                  });


                  await updatePerfume(
                        id,
                        formData
                  );

                  showSuccessToast(
                        "Perfume updated successfully",
                        toastId
                  );

                  navigate(`/perfume/${id}`);

            } catch (error) {

                  showErrorToast(
                        error?.response?.data?.message ||
                        "Failed to update perfume",
                        toastId
                  );

            } finally {

                  setIsSubmitting(false);

            }
      };


      return (
            <div className="h-screen w-screen flex items-center justify-center bg-secondary-white p-4 sm:p-6 md:p-8 overflow-hidden">

                  {/* Main Form Dashboard Container */}
                  <div className="w-full max-w-5xl h-[95vh] sm:h-[88vh] max-h-200 bg-primary-white rounded-2xl border border-beige-light shadow-md overflow-hidden flex flex-col">

                        <form
                              onSubmit={handleSubmit(onSubmit)}
                              className="h-full w-full p-6 sm:p-10 bg-primary-white flex flex-col justify-center overflow-hidden"
                        >
                              {/* Header Message Block */}
                              <div className="mb-6 space-y-1 text-center md:text-left shrink-0 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                    <div>
                                          <h2 className="font-primary text-2xl lg:text-3xl font-bold tracking-tight text-primary-black">
                                                Update Fragrance Profile
                                          </h2>
                                          <p className="text-xs sm:text-sm font-secondary text-secondary-black">
                                                Modify olfactory architecture, pricing tiers, and active catalog metadata.
                                          </p>
                                    </div>

                                    {/* Dynamic Status Badge */}
                                    <div className="self-center md:self-auto px-3 py-1 bg-beige-light/30 border border-beige-light rounded-full text-[10px] font-bold tracking-widest uppercase text-beige-dark font-secondary">
                                          perfume ID: {id}
                                    </div>
                              </div>

                              {/* Scrollable Form Body - Splitting into 2 columns on desktop (md:) */}
                              <div className="grow overflow-y-auto pr-1 custom-scrollbar py-1">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                                          {/* LEFT COLUMN: Core Logistics & Pricing Matrix */}
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

                                                      {/* Target Gender Select Blocks */}
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

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                      <div className="grid grid-cols-2 gap-3 bg-secondary-white/50 p-3 rounded-xl border border-beige-light/60">
                                                            <Input
                                                                  type="number"
                                                                  label="Price ($)"
                                                                  placeholder="85.00"
                                                                  error={errors.price ? errors.price.message : null}
                                                                  {...register("price", {
                                                                        required: "Required",
                                                                        min: {
                                                                              value: 1,
                                                                              message: "Price must be greater than 0"
                                                                        }
                                                                  })}
                                                            />
                                                            <Input
                                                                  type="number"
                                                                  label="Discount (%)"
                                                                  placeholder="22"
                                                                  error={errors.discount ? errors.discount.message : null}
                                                                  {...register("discount", {
                                                                        min: {
                                                                              value: 0,
                                                                              message: "Discount cannot be negative"
                                                                        },
                                                                        max: {
                                                                              value: 100,
                                                                              message: "Discount cannot exceed 100%"
                                                                        }
                                                                  })}
                                                            />
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
                                          </div>

                                          {/* RIGHT COLUMN: Olfactory Pyramid & Asset Overwrite Dropzone */}
                                          <div className="space-y-4">
                                                {/* The Scent Notes Block */}
                                                <div className="bg-secondary-white/30 p-4 rounded-xl border border-beige-light/40 space-y-3">
                                                      <h3 className="text-[11px] font-bold text-primary-black tracking-wider uppercase font-secondary opacity-70">
                                                            Fragrance Notes Pyramid
                                                      </h3>
                                                      <Input
                                                            type="text"
                                                            label="Top Notes"
                                                            placeholder="e.g. Bergamot, Grapefruit"
                                                            error={errors.top ? errors.top.message : null}
                                                            {...register("top", { required: "Top notes are required" })}
                                                      />
                                                      <Input
                                                            type="text"
                                                            label="Heart Notes"
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

                                                {/* Media Overwrite Block */}
                                                <div className="flex flex-col gap-1.5 w-full">
                                                      <label className="text-xs font-bold tracking-wide text-primary-black uppercase font-secondary">
                                                            Update Asset Media
                                                      </label>

                                                      {/* Dynamic Image Thumbnails of current active files */}
                                                      {existingImages && existingImages.length > 0 && (
                                                            <div className="grid grid-cols-4 gap-2 mb-1 p-2 bg-secondary-white/50 border border-beige-light/40 rounded-xl">
                                                                  {existingImages.map((img) => (
                                                                        <div key={img.public_id} className="relative aspect-square rounded-lg overflow-hidden border border-beige-light bg-primary-white group">
                                                                              <img src={img.url} alt="Product frame" className="w-full h-full object-cover" />
                                                                              <div className="absolute inset-0 bg-primary-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                                                                                    <button
                                                                                          type="button"
                                                                                          onClick={() =>
                                                                                                removeExisting(img.public_id)
                                                                                          }
                                                                                          className="text-[9px] font-bold text-red-600 bg-secondary-white/70 cursor-pointer p-2 rounded-lg tracking-wider uppercase"
                                                                                    >
                                                                                          Delete
                                                                                    </button>
                                                                              </div>
                                                                        </div>
                                                                  ))}
                                                            </div>
                                                      )}

                                                      {newFiles.length > 0 && (
                                                            <div className="grid grid-cols-4 gap-2 mb-1 p-2 bg-secondary-white/50 border border-beige-light/40 rounded-xl">

                                                                  {newFiles.map((fileObj, index) => (

                                                                        <div
                                                                              key={index}
                                                                              className="relative aspect-square rounded-lg overflow-hidden border border-beige-light bg-primary-white group"
                                                                        >

                                                                              <img
                                                                                    src={fileObj.preview}
                                                                                    alt="New Upload"
                                                                                    className="w-full h-full object-cover"
                                                                              />

                                                                              <div className="absolute inset-0 bg-primary-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">

                                                                                    <button
                                                                                          type="button"
                                                                                          onClick={() =>
                                                                                                removeNewFile(index)
                                                                                          }
                                                                                          className="text-[9px] font-bold text-red-600 bg-secondary-white/50 p-1 rounded-md tracking-wider uppercase"
                                                                                    >
                                                                                          Remove
                                                                                    </button>

                                                                              </div>

                                                                        </div>

                                                                  ))}

                                                            </div>
                                                      )}

                                                      {/* Edit Replacement Dropzone */}
                                                      <div className="relative group border-2 border-dashed border-beige-light/80 hover:border-beige-dark bg-secondary-white/40 rounded-xl p-4 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer min-h-27.5">
                                                            <input
                                                                  type="file"
                                                                  multiple
                                                                  accept="image/*"
                                                                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                                  onChange={handleFileChange}
                                                            />

                                                            <p className="text-[10px] text-secondary-black/60 mt-1 text-center">
                                                                  {totalImages}/5 Images </p>
                                                            <svg className="w-6 h-6 text-beige-dark/60 group-hover:text-beige-dark mb-1 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                            </svg>

                                                            <p className="text-xs font-semibold text-secondary-black text-center font-primary">
                                                                  <span className="text-beige-dark group-hover:text-beige-accent underline underline-offset-2 transition-colors">Upload new assets</span> to overwrite gallery
                                                            </p>
                                                            <p className="text-[10px] text-secondary-black/50 font-secondary mt-0.5 text-center">
                                                                  Leaving blank retains active images (Batch limit: 5 items)
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

                              {/* Action Footer Update Block */}
                              <div className="pt-4 shrink-0 mt-4 border-t border-beige-light/30 flex items-center justify-end gap-3">
                                    <button
                                          type="button"
                                          onClick={() => navigate(-1)}
                                          className="px-6 py-3 border border-beige-light text-secondary-black rounded-xl hover:bg-secondary-white/50 transition-all font-secondary font-bold text-xs tracking-wider uppercase"
                                    >
                                          Cancel
                                    </button>
                                    <Button
                                          type="submit"
                                          disabled={isSubmitting}
                                          child={isSubmitting ? "Updating Database..." : "Commit Changes to Catalog"}
                                          colorSchema={isSubmitting ? "bg-beige-dark text-primary-white cursor-not-allowed opacity-75" : "bg-primary-black hover:bg-primary-black/90 text-primary-white shadow-sm"}
                                          className="px-8 py-3 rounded-xl transition-all font-secondary font-bold text-xs tracking-wider uppercase grow md:grow-0"
                                    />
                              </div>

                        </form>

                  </div>
            </div>
      );
}