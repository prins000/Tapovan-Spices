import { createContext, useContext, useState, useEffect } from 'react';

const InquiryContext = createContext();

export function InquiryProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('tapovan_inquiry_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  const saveCartToStorage = (newCart) => {
    setCart(newCart);
    try {
      localStorage.setItem('tapovan_inquiry_cart', JSON.stringify(newCart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  };

  const addToCart = (product, variant, packaging, quantity, notes = '') => {
    // Basic validation
    const qty = Math.max(1, parseInt(quantity) || 1);
    const selectedPackaging = packaging || '250g';
    const itemId = `${product.id}-${selectedPackaging}`;

    const existingIndex = cart.findIndex((item) => item.id === itemId);
    let newCart = [...cart];

    if (existingIndex > -1) {
      // Merge quantities if duplicate exists
      newCart[existingIndex].quantity += qty;
      if (notes) {
        newCart[existingIndex].notes = newCart[existingIndex].notes
          ? `${newCart[existingIndex].notes}; ${notes}`
          : notes;
      }
    } else {
      // Add new item
      newCart.push({
        id: itemId,
        productId: product.id,
        name: product.name,
        subtitle: product.subtitle,
        category: product.category,
        image: product.image,
        packaging: selectedPackaging,
        quantity: qty,
        notes: notes,
      });
    }

    saveCartToStorage(newCart);
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    saveCartToStorage(newCart);
  };

  const updateQuantity = (id, quantity) => {
    const qty = Math.max(1, parseInt(quantity) || 1);
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: qty } : item
    );
    saveCartToStorage(newCart);
  };

  const updateItemPackaging = (id, newPackaging) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        const newId = `${item.productId}-${newPackaging}`;
        return { ...item, id: newId, packaging: newPackaging };
      }
      return item;
    });

    // Handle potential duplicate merge after ID change
    const mergedCart = [];
    newCart.forEach((item) => {
      const existing = mergedCart.find((x) => x.id === item.id);
      if (existing) {
        existing.quantity += item.quantity;
        if (item.notes) {
          existing.notes = existing.notes ? `${existing.notes}; ${item.notes}` : item.notes;
        }
      } else {
        mergedCart.push(item);
      }
    });

    saveCartToStorage(mergedCart);
  };

  const updateItemNotes = (id, notes) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, notes } : item
    );
    saveCartToStorage(newCart);
  };

  const clearCart = () => {
    saveCartToStorage([]);
  };

  // WhatsApp helper
  const openWhatsApp = (messageText) => {
    const phone = '917048821883'; // From client contact info: +91 7048821883
    const encodedText = encodeURIComponent(messageText);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    let url;
    if (isMobile) {
      url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedText}`;
    } else {
      url = `https://web.whatsapp.com/send?phone=${phone}&text=${encodedText}`;
    }
    window.open(url, '_blank');
  };

  // Generate WhatsApp Message Template
  const generateInquiryMessage = (inquiryType, fields = {}) => {
    let msg = `Hello Tapovan Spices,\n\nI would like to submit an inquiry from your website.`;

    if (cart.length > 0) {
      msg += `\n\n*Product Inquiry List:*\n`;
      cart.forEach((item, index) => {
        msg += `${index + 1}. *${item.name}* (${item.subtitle})\n`;
        msg += `   • Package Size: ${item.packaging}\n`;
        msg += `   • Quantity: ${item.quantity}\n`;
        if (item.notes) {
          msg += `   • Item Notes: ${item.notes}\n`;
        }
        msg += `\n`;
      });
    }

    if (fields.deliveryLocation) {
      msg += `*Delivery Location:* ${fields.deliveryLocation}\n\n`;
    }

    // Map Inquiry Types
    msg += `*Inquiry Type:* `;
    switch (inquiryType) {
      case 'wholesale':
        msg += `Wholesale Inquiry\n`;
        if (fields.businessName) msg += `• Business Name: ${fields.businessName}\n`;
        if (fields.gstNumber) msg += `• GST (Optional): ${fields.gstNumber}\n`;
        if (fields.expectedMonthlyRequirement) msg += `• Expected Monthly Requirement: ${fields.expectedMonthlyRequirement}\n`;
        msg += `• Purpose: Wholesale\n`;
        break;

      case 'export':
        msg += `Export Inquiry\n`;
        if (fields.companyName) msg += `• Company Name: ${fields.companyName}\n`;
        if (fields.country) msg += `• Destination Country: ${fields.country}\n`;
        if (fields.portOfDestination) msg += `• Port of Destination: ${fields.portOfDestination}\n`;
        if (fields.containerQuantity) msg += `• Container Quantity: ${fields.containerQuantity}\n`;
        if (fields.packagingRequirement) msg += `• Packaging Requirement: ${fields.packagingRequirement}\n`;
        if (fields.shippingMethod) msg += `• Shipping Method: ${fields.shippingMethod}\n`;
        msg += `• Purpose: Export\n`;
        break;

      case 'distributor':
        msg += `Distributor Inquiry\n`;
        if (fields.businessName) msg += `• Business Name: ${fields.businessName}\n`;
        if (fields.distributionNetwork) msg += `• Current Distribution Network: ${fields.distributionNetwork}\n`;
        if (fields.distributorLocation) msg += `• Distribution Territory: ${fields.distributorLocation}\n`;
        msg += `• Purpose: Distribution Partner\n`;
        break;

      case 'retail':
      default:
        msg += `Retail Purchase\n`;
        msg += `• Purpose: Home Use / Retail\n`;
        break;
    }

    if (fields.generalNotes) {
      msg += `\n*General Inquiry Notes:*\n${fields.generalNotes}\n`;
    }

    msg += `\n*Please share:*\n`;
    msg += `• Latest Pricing\n`;
    msg += `• Availability / Lead Time\n`;
    msg += `• MOQ (if applicable)\n`;
    msg += `• Shipping Charges\n`;
    msg += `• Estimated Delivery Time\n`;
    msg += `• Payment Methods (Bank Transfer, UPI, L/C, etc.)\n\n`;
    msg += `Thank you.`;

    return msg;
  };

  // Generate single item WhatsApp text
  const generateSingleItemMessage = (product, variant, packaging, quantity, actionType = 'order') => {
    const qty = Math.max(1, parseInt(quantity) || 1);
    const selectedPackaging = packaging || '250g';
    const action = actionType === 'price' ? 'request the price for' : 'order';

    let msg = `Hello Tapovan Spices,\n\nI would like to ${action} the following product:\n\n`;
    msg += `*${product.name}* (${product.subtitle})\n`;
    msg += `• Package Size: ${selectedPackaging}\n`;
    msg += `• Quantity: ${qty}\n\n`;
    msg += `Please share:\n`;
    msg += `• Latest Pricing\n`;
    msg += `• Product Availability\n`;
    msg += `• Shipping / Delivery Inquiry\n\n`;
    msg += `Thank you.`;
    return msg;
  };

  const sendSingleItemInquiry = (product, variant, packaging, quantity, actionType = 'order') => {
    const msg = generateSingleItemMessage(product, variant, packaging, quantity, actionType);
    openWhatsApp(msg);
  };

  const submitCartInquiry = (inquiryType, fields) => {
    const msg = generateInquiryMessage(inquiryType, fields);
    openWhatsApp(msg);
  };

  return (
    <InquiryContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateItemPackaging,
        updateItemNotes,
        clearCart,
        generateInquiryMessage,
        sendSingleItemInquiry,
        submitCartInquiry,
        openWhatsApp,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error('useInquiry must be used within an InquiryProvider');
  }
  return context;
}
