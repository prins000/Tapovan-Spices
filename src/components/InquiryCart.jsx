import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, Copy, Check, ClipboardList, Info, MessageSquare } from 'lucide-react';
import { useInquiry } from './InquiryContext';

const PACKAGING_OPTIONS = ['100g', '200g', '250g', '400g', '500g', '1kg', 'Bulk (20kg)', 'Custom Packaging'];

export default function InquiryCart({ onBrowseSpices }) {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    updateItemPackaging,
    updateItemNotes,
    clearCart,
    generateInquiryMessage,
    submitCartInquiry,
    useBackup,
    setUseBackup,
  } = useInquiry();

  const [inquiryType, setInquiryType] = useState('retail');
  const [fields, setFields] = useState({
    deliveryLocation: '',
    businessName: '',
    gstNumber: '',
    expectedMonthlyRequirement: '',
    companyName: '',
    country: '',
    portOfDestination: '',
    containerQuantity: '',
    packagingRequirement: '',
    shippingMethod: 'FOB',
    distributionNetwork: '',
    distributorLocation: '',
    generalNotes: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [copied, setCopied] = useState(false);

  const handleFieldChange = (key, value) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (validationErrors[key]) {
      setValidationErrors((prev) => ({ ...prev, [key]: null }));
    }
  };

  // Lock body scroll and stop Lenis when cart drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      if (window.lenis) {
        window.lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      if (window.lenis) {
        window.lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      if (window.lenis) {
        window.lenis.start();
      }
    }
  }, [isCartOpen]);

  const validateForm = () => {
    const errors = {};
    
    // Check quantity validation for all items
    cart.forEach(item => {
      if (item.quantity <= 0 || isNaN(item.quantity)) {
        errors[`qty-${item.id}`] = 'Quantity must be at least 1';
      }
    });

    // Check specific fields based on inquiry type
    if (inquiryType === 'wholesale') {
      if (!fields.businessName.trim()) errors.businessName = 'Business name is required';
      if (!fields.deliveryLocation.trim()) errors.deliveryLocation = 'Delivery location is required';
    } else if (inquiryType === 'export') {
      if (!fields.companyName.trim()) errors.companyName = 'Company name is required';
      if (!fields.country.trim()) errors.country = 'Destination country is required';
      if (!fields.portOfDestination.trim()) errors.portOfDestination = 'Port of destination is required';
    } else if (inquiryType === 'distributor') {
      if (!fields.businessName.trim()) errors.businessName = 'Business name is required';
      if (!fields.distributorLocation.trim()) errors.distributorLocation = 'Distribution territory is required';
    } else {
      // Retail
      if (!fields.deliveryLocation.trim()) errors.deliveryLocation = 'Delivery location is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    submitCartInquiry(inquiryType, fields);
  };

  const handleCopyMessage = () => {
    if (!validateForm()) return;
    const msg = generateInquiryMessage(inquiryType, fields);
    navigator.clipboard.writeText(msg).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />

          {/* Cart Drawer */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-full max-w-xl bg-[#FAF7F2] border-l border-amber-100/40 shadow-2xl z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-200/40 flex items-center justify-between bg-white bg-opacity-95">
              <div className="flex items-center gap-2.5">
                <ClipboardList className="text-[#9C7A2E] w-5 h-5" />
                <h2 className="font-serif text-xl font-bold text-[#2A1F14]">Inquiry Cart</h2>
                <span className="bg-[#9C7A2E]/10 text-[#9C7A2E] text-xs font-semibold px-2 py-0.5 rounded-full">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} items
                </span>
              </div>
              <div className="flex items-center gap-4">
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs font-semibold uppercase tracking-wider text-rose-600 hover:text-rose-800 transition-colors cursor-pointer bg-transparent border-none"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors text-stone-600 cursor-pointer border-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-grow overflow-y-auto p-6 space-y-8" data-lenis-prevent>
              {cart.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-[#C9A454]">
                    <ClipboardList className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-800">Your Inquiry list is empty</h3>
                  <p className="text-sm text-stone-500 max-w-sm">
                    Select products from our premium catalog, configure packaging options, and add them here to start.
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      if (onBrowseSpices) onBrowseSpices();
                    }}
                    className="btn-primary mt-2 text-xs cursor-pointer"
                  >
                    Browse Spices
                  </button>
                </div>

              ) : (
                <>
                  {/* Cart Items List */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#9A8B78] border-b border-stone-200/20 pb-2">
                      Selected Products
                    </h3>
                    <div className="space-y-4">
                      {cart.map((item) => {
                        return (
                          <div
                            key={item.id}
                            className="bg-white p-4 rounded-2xl border border-stone-200/30 shadow-sm flex gap-4 relative group"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-xl border border-stone-200/20 flex-shrink-0"
                            />
                            <div className="flex-grow space-y-2">
                              <div className="flex justify-between items-start pr-6">
                                <div>
                                  <h4 className="font-serif font-bold text-sm text-stone-900">{item.name}</h4>
                                  <p className="text-[10px] text-stone-400 font-sans italic">{item.subtitle}</p>
                                </div>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="absolute top-4 right-4 text-stone-400 hover:text-rose-600 transition-colors p-1 rounded hover:bg-stone-50 cursor-pointer border-none bg-transparent"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>

                              {/* Configurations */}
                              <div className="text-xs">
                                {/* Packaging Selection */}
                                <div>
                                  <label className="block text-[9px] uppercase tracking-wider text-stone-400 mb-0.5">
                                    Packaging Size
                                  </label>
                                  <select
                                    value={item.packaging}
                                    onChange={(e) => updateItemPackaging(item.id, e.target.value)}
                                    className="w-full max-w-[200px] text-xs bg-stone-50 border border-stone-200/40 rounded px-1.5 py-1 text-stone-700 outline-none"
                                  >
                                    {PACKAGING_OPTIONS.map((p) => (
                                      <option key={p} value={p}>
                                        {p}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>

                              {/* Quantity Stepper & Notes */}
                              <div className="flex items-center justify-between gap-4 pt-1">
                                <div className="flex items-center border border-stone-200/60 rounded-lg overflow-hidden bg-stone-50 h-7">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="px-2 h-full text-stone-500 hover:bg-stone-200 transition-colors flex items-center justify-center border-none bg-transparent cursor-pointer"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                    className="w-8 text-center text-xs font-semibold bg-transparent border-none outline-none text-stone-800"
                                  />
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="px-2 h-full text-stone-500 hover:bg-stone-200 transition-colors flex items-center justify-center border-none bg-transparent cursor-pointer"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                                {validationErrors[`qty-${item.id}`] && (
                                  <p className="text-[9px] text-rose-500">{validationErrors[`qty-${item.id}`]}</p>
                                )}
                              </div>

                              {/* Item Notes */}
                              <div>
                                <input
                                  type="text"
                                  placeholder="Add notes for this item (e.g. custom labels)..."
                                  value={item.notes || ''}
                                  onChange={(e) => updateItemNotes(item.id, e.target.value)}
                                  className="w-full text-[10px] bg-stone-50/50 hover:bg-stone-50 border border-transparent hover:border-stone-200/40 rounded px-2 py-1 text-stone-600 outline-none transition-all"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Inquiry details */}
                  <div className="space-y-4 pt-4 border-t border-stone-200/40">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#9A8B78] pb-1">
                      Inquiry Details
                    </h3>

                    {/* Inquiry Type Tabs */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-600 mb-2">Inquiry Type *</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-xl bg-stone-100 border border-stone-200/20">
                        {[
                          { id: 'retail', label: 'Retail' },
                          { id: 'wholesale', label: 'Wholesale' },
                          { id: 'export', label: 'Export' },
                          { id: 'distributor', label: 'Distributor' },
                        ].map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => {
                              setInquiryType(t.id);
                              setValidationErrors({});
                            }}
                            className={`py-1.5 text-[10px] font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer border-none ${
                              inquiryType === t.id
                                ? 'bg-white text-[#9C7A2E] shadow-sm'
                                : 'text-stone-500 hover:text-stone-800 bg-transparent'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Contextual Forms */}
                    <div className="bg-white p-5 rounded-2xl border border-stone-200/20 shadow-sm space-y-4">
                      {inquiryType === 'retail' && (
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">
                            Delivery Location (City/Country) *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Mumbai, India or Kuala Lumpur, Malaysia"
                            value={fields.deliveryLocation}
                            onChange={(e) => handleFieldChange('deliveryLocation', e.target.value)}
                            className={`input-field text-xs py-2 px-3 ${
                              validationErrors.deliveryLocation ? 'border-rose-400 bg-rose-50/20' : ''
                            }`}
                          />
                          {validationErrors.deliveryLocation && (
                            <p className="text-[10px] text-rose-500 mt-1">{validationErrors.deliveryLocation}</p>
                          )}
                        </div>
                      )}

                      {inquiryType === 'wholesale' && (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-semibold text-stone-600 mb-1">Business Name *</label>
                            <input
                              type="text"
                              required
                              placeholder="Your trading company or store name"
                              value={fields.businessName}
                              onChange={(e) => handleFieldChange('businessName', e.target.value)}
                              className={`input-field text-xs py-2 px-3 ${
                                validationErrors.businessName ? 'border-rose-400 bg-rose-50/20' : ''
                              }`}
                            />
                            {validationErrors.businessName && (
                              <p className="text-[10px] text-rose-500 mt-1">{validationErrors.businessName}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-stone-600 mb-1">GST Number (Optional)</label>
                            <input
                              type="text"
                              placeholder="e.g. 24AAAAA1111A1Z1"
                              value={fields.gstNumber}
                              onChange={(e) => handleFieldChange('gstNumber', e.target.value)}
                              className="input-field text-xs py-2 px-3"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-stone-600 mb-1">
                              Expected Monthly Requirement
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. 500 kg, 2 tons"
                              value={fields.expectedMonthlyRequirement}
                              onChange={(e) => handleFieldChange('expectedMonthlyRequirement', e.target.value)}
                              className="input-field text-xs py-2 px-3"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-stone-600 mb-1">Delivery Location *</label>
                            <input
                              type="text"
                              required
                              placeholder="City / State"
                              value={fields.deliveryLocation}
                              onChange={(e) => handleFieldChange('deliveryLocation', e.target.value)}
                              className={`input-field text-xs py-2 px-3 ${
                                validationErrors.deliveryLocation ? 'border-rose-400 bg-rose-50/20' : ''
                              }`}
                            />
                            {validationErrors.deliveryLocation && (
                              <p className="text-[10px] text-rose-500 mt-1">{validationErrors.deliveryLocation}</p>
                            )}
                          </div>
                        </div>
                      )}

                      {inquiryType === 'export' && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-semibold text-stone-600 mb-1">Company Name *</label>
                              <input
                                type="text"
                                required
                                placeholder="Export company"
                                value={fields.companyName}
                                onChange={(e) => handleFieldChange('companyName', e.target.value)}
                                className={`input-field text-xs py-2 px-3 ${
                                  validationErrors.companyName ? 'border-rose-400 bg-rose-50/20' : ''
                                }`}
                              />
                              {validationErrors.companyName && (
                                <p className="text-[10px] text-rose-500 mt-1">{validationErrors.companyName}</p>
                              )}
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-stone-600 mb-1">Destination Country *</label>
                              <input
                                type="text"
                                required
                                placeholder="Country"
                                value={fields.country}
                                onChange={(e) => handleFieldChange('country', e.target.value)}
                                className={`input-field text-xs py-2 px-3 ${
                                  validationErrors.country ? 'border-rose-400 bg-rose-50/20' : ''
                                }`}
                              />
                              {validationErrors.country && (
                                <p className="text-[10px] text-rose-500 mt-1">{validationErrors.country}</p>
                              )}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-semibold text-stone-600 mb-1">Port of Destination *</label>
                              <input
                                type="text"
                                required
                                placeholder="Port name"
                                value={fields.portOfDestination}
                                onChange={(e) => handleFieldChange('portOfDestination', e.target.value)}
                                className={`input-field text-xs py-2 px-3 ${
                                  validationErrors.portOfDestination ? 'border-rose-400 bg-rose-50/20' : ''
                                }`}
                              />
                              {validationErrors.portOfDestination && (
                                <p className="text-[10px] text-rose-500 mt-1">{validationErrors.portOfDestination}</p>
                              )}
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-stone-600 mb-1">Container Qty</label>
                              <input
                                type="text"
                                placeholder="e.g. 20ft FCL, 40ft FCL"
                                value={fields.containerQuantity}
                                onChange={(e) => handleFieldChange('containerQuantity', e.target.value)}
                                className="input-field text-xs py-2 px-3"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-stone-600 mb-1">Packaging Requirement</label>
                            <input
                              type="text"
                              placeholder="e.g. 20kg HDPE bags, custom vacuum pack"
                              value={fields.packagingRequirement}
                              onChange={(e) => handleFieldChange('packagingRequirement', e.target.value)}
                              className="input-field text-xs py-2 px-3"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-stone-600 mb-1">Shipping Term</label>
                            <select
                              value={fields.shippingMethod}
                              onChange={(e) => handleFieldChange('shippingMethod', e.target.value)}
                              className="input-field text-xs py-2 px-3"
                            >
                              <option value="FOB">FOB (Free On Board)</option>
                              <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                              <option value="CFR">CFR (Cost & Freight)</option>
                              <option value="EXW">EXW (Ex Works)</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {inquiryType === 'distributor' && (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-semibold text-stone-600 mb-1">Business Details *</label>
                            <input
                              type="text"
                              required
                              placeholder="Current business, trading items"
                              value={fields.businessName}
                              onChange={(e) => handleFieldChange('businessName', e.target.value)}
                              className={`input-field text-xs py-2 px-3 ${
                                validationErrors.businessName ? 'border-rose-400 bg-rose-50/20' : ''
                              }`}
                            />
                            {validationErrors.businessName && (
                              <p className="text-[10px] text-rose-500 mt-1">{validationErrors.businessName}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-stone-600 mb-1">
                              Current Distribution Network
                            </label>
                            <textarea
                              rows={2}
                              placeholder="List cities, stores, or chains you supply to"
                              value={fields.distributionNetwork}
                              onChange={(e) => handleFieldChange('distributionNetwork', e.target.value)}
                              className="input-field text-xs py-2 px-3 overscroll-contain"
                              style={{ overscrollBehavior: 'contain' }}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-stone-600 mb-1">
                              Distribution Territory (Location) *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Cities / States / Country you cover"
                              value={fields.distributorLocation}
                              onChange={(e) => handleFieldChange('distributorLocation', e.target.value)}
                              className={`input-field text-xs py-2 px-3 ${
                                validationErrors.distributorLocation ? 'border-rose-400 bg-rose-50/20' : ''
                              }`}
                            />
                            {validationErrors.distributorLocation && (
                              <p className="text-[10px] text-rose-500 mt-1">{validationErrors.distributorLocation}</p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* General Message Field */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-600 mb-1">
                          General Inquiry Notes (Optional)
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Write any other details or requests for our team..."
                          value={fields.generalNotes}
                          onChange={(e) => handleFieldChange('generalNotes', e.target.value)}
                          className="input-field text-xs py-2 px-3 overscroll-contain"
                          style={{ overscrollBehavior: 'contain' }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sticky Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-stone-200/40 bg-white space-y-4 flex-shrink-0 bg-opacity-95">
                {/* No payments notification */}
                <div className="flex gap-2.5 p-3.5 rounded-xl bg-amber-50/50 border border-amber-100/30 text-stone-600 text-xs">
                  <Info className="w-4 h-4 text-[#9C7A2E] flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <span className="font-semibold text-stone-800">No Online Payment:</span> Payment details will be shared
                    by our sales team after confirming your order details. We support Bank Transfer, UPI, L/C, TT, etc.
                  </p>
                </div>

                {/* WhatsApp Desk Selection Toggle */}
                <div className="flex items-center justify-between text-[11px] pb-2 border-b border-stone-100">
                  <span className="text-stone-500 font-semibold">Contact WhatsApp Desk:</span>
                  <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg border border-stone-200/40">
                    <button
                      type="button"
                      onClick={() => setUseBackup(false)}
                      className={`px-2 py-1 text-[9px] font-bold rounded-md cursor-pointer border-none transition-all ${
                        !useBackup ? 'bg-white text-[#9C7A2E] shadow-sm' : 'text-stone-500 bg-transparent hover:text-stone-700'
                      }`}
                    >
                      Primary (+91 70488 11883)
                    </button>
                    <button
                      type="button"
                      onClick={() => setUseBackup(true)}
                      className={`px-2 py-1 text-[9px] font-bold rounded-md cursor-pointer border-none transition-all ${
                        useBackup ? 'bg-white text-[#9C7A2E] shadow-sm' : 'text-stone-500 bg-transparent hover:text-stone-700'
                      }`}
                    >
                      Backup (+91 97142 17705)
                    </button>
                  </div>
                </div>

                {/* Primary WhatsApp Action */}
                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    onClick={handleSendWhatsApp}
                    className="flex-grow flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white font-semibold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-emerald-500/20 hover:bg-[#20ba59] transition-all transform hover:-translate-y-0.5 duration-200 cursor-pointer border-none"
                  >
                    <MessageSquare className="w-4 h-4" /> Send Inquiry via WhatsApp
                  </button>
                  <button
                    onClick={handleCopyMessage}
                    className="flex items-center justify-center gap-2 py-3 px-6 border border-stone-300 rounded-full font-semibold text-xs uppercase tracking-wider text-stone-700 hover:bg-stone-50 transition-all cursor-pointer bg-white"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copy Message
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
