import { FaPen, FaTimes } from "react-icons/fa";

const AddressCard = ({ addr, index, startEditingAddress, removeAddressHandler }) => {
      return (
            <div
                  className={`p-4 rounded-xl border relative transition-all ${addr.isDefault
                        ? 'border-[#4F6F52] bg-[#739072]/5 shadow-inner'
                        : 'border-[#DFD0B8] bg-white'
                        }`}
            >
                  <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-[#222831] text-sm">Address {index + 1}</h3>

                        <div className="flex items-center gap-2">
                              {addr.isDefault && (
                                    <span className="bg-[#4F6F52] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                                          Default
                                    </span>
                              )}

                              <div className="flex items-center gap-4">
                                    {/* Edit Trigger - Passes complete object right up to hook orchestrator */}
                                    <button
                                          type="button"
                                          onClick={() => startEditingAddress(addr)}
                                          className="p-1 text-gray-400 hover:text-[#4F6F52] transition-colors rounded-md hover:bg-gray-100"
                                          title="Edit Address"
                                    >
                                          <FaPen className="text-[10px]" />
                                    </button>

                                    {/* Delete Trigger - Dispatches explicit unique ID directly into hook method */}
                                    <button
                                          type="button"
                                          onClick={() => removeAddressHandler(addr._id)}
                                          className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50 transition-colors"
                                          title="Remove Address"
                                    >
                                          <FaTimes className="text-[12px]" />
                                    </button>
                              </div>
                        </div>
                  </div>

                  {/* Render Clean Plain Text Fields */}
                  <div className="font-['Roboto',sans-serif] text-xs text-[#4B5563] mt-1 space-y-0.5">
                        <p className="capitalize text-gray-800 font-medium truncate">{addr.address}</p>
                        <p className="truncate capitalize">{addr.city}, {addr.state} {addr.pincode}</p>
                        <p className="truncate capitalize">{addr.country}</p>
                  </div>
            </div>
      );
}


export default AddressCard