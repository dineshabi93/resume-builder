import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { paymentAPI } from '../utils/axios';
import { 
  Crown, 
  Check, 
  Star, 
  Zap, 
  Download, 
  Palette, 
  Shield,
  CreditCard,
  ArrowLeft
} from 'lucide-react';

const UpgradePage = () => {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      currency: 'INR',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        '1 Basic Resume Template',
        'PDF Download',
        'Basic Support',
        'Public Resume Link'
      ],
      limitations: [
        'Limited to 1 template',
        'Basic features only',
        'Community support'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 499,
      currency: 'INR',
      period: 'lifetime',
      description: 'Everything you need for professional resumes',
      features: [
        'All Premium Templates (4+)',
        'Unlimited Resumes',
        'Priority Support',
        'Custom Branding',
        'Advanced Analytics',
        'No Watermark',
        'Template Customization',
        'Export to Multiple Formats'
      ],
      popular: true
    }
  ];

  const handleUpgrade = async () => {
    if (selectedPlan === 'free' || user?.isPremium) {
      return;
    }

    setLoading(true);
    
    try {
      // Create Razorpay order
      const orderResponse = await paymentAPI.createOrder({
        amount: plans.find(p => p.id === selectedPlan).price,
        currency: 'INR'
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderResponse.data.amount,
        currency: orderResponse.data.currency,
        name: 'ResumeBuilder Pro',
        description: 'Upgrade to Pro - Lifetime Access',
        order_id: orderResponse.data.orderId,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await paymentAPI.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyResponse.data.isPremium) {
              updateUser({ isPremium: true });
              alert('Payment successful! You now have access to all premium features.');
              navigate('/dashboard');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email
        },
        theme: {
          color: '#2563eb'
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment initiation error:', error);
      alert('Failed to initiate payment. Please try again.');
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Premium Templates",
      description: "Access to 4+ professionally designed resume templates"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Unlimited Resumes",
      description: "Create as many resumes as you need for different roles"
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Multiple Export Formats",
      description: "Download your resume in PDF, Word, and other formats"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Priority Support",
      description: "Get help when you need it with our priority support"
    }
  ];

  if (user?.isPremium) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Crown className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              You're Already a Pro Member!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Enjoy all the premium features and create amazing resumes.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Crown className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Upgrade to Pro
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Unlock all premium templates and advanced features to create professional resumes that stand out.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What You'll Get with Pro
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                  plan.popular ? 'ring-2 ring-blue-500 relative' : ''
                } ${
                  selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="text-4xl font-bold text-gray-900 mb-1">
                      ₹{plan.price}
                      {plan.price > 0 && (
                        <span className="text-lg text-gray-600 font-normal">/{plan.period}</span>
                      )}
                    </div>
                    {plan.price === 0 && (
                      <span className="text-lg text-gray-600">Forever</span>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                    {plan.limitations && plan.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-center text-gray-500">
                        <div className="h-5 w-5 mr-3 flex-shrink-0 flex items-center justify-center">
                          <div className="h-1 w-3 bg-gray-300"></div>
                        </div>
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => {
                      setSelectedPlan(plan.id);
                      if (plan.id !== 'free') {
                        handleUpgrade();
                      }
                    }}
                    disabled={loading || (plan.id === 'free')}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                      plan.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : plan.id === 'free'
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loading && selectedPlan === plan.id ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : plan.id === 'free' ? (
                      'Current Plan'
                    ) : (
                      <>
                        <CreditCard className="inline h-5 w-5 mr-2" />
                        Upgrade Now
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Is this a one-time payment?
              </h3>
              <p className="text-gray-600">
                Yes! Our Pro plan is a lifetime purchase. Pay once and enjoy all premium features forever.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I download my resumes?
              </h3>
              <p className="text-gray-600">
                Absolutely! You can download your resumes as PDF files and share them with employers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, debit cards, and UPI payments through Razorpay.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Is my data secure?
              </h3>
              <p className="text-gray-600">
                Yes! We use industry-standard encryption to protect your data and never share it with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Razorpay Script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </div>
  );
};

export default UpgradePage;

