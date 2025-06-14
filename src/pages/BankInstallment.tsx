import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, CreditCard, Clock, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

const banks = [
  {
    name: 'Banque Misr',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Banque_Misr.svg/1200px-Banque_Misr.svg.png'
  },
  {
    name: 'BDC',
    logo: 'https://hapijournal.com/wp-content/uploads/2020/01/bank.jpg'
  },
  {
    name: 'NBE',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/32/National_Bank_of_Egypt.svg'
  },
  {
    name: 'CIB',
    logo: 'https://ytg.eco/wp-content/uploads/2024/05/commercial-international-bank-cib-vector-logo-small.png'
  },
  {
    name: 'Mashreq',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb-cxi4QySV-LUwoNaT3HHKjW64K37kuU3Gg&s'
  }
];

const benefits = [
  {
    icon: Shield,
    title: 'دفع آمن',
    description: 'جميع المعاملات مؤمنة بأحدث تقنيات الحماية'
  },
  {
    icon: CreditCard,
    title: 'أقساط مريحة',
    description: 'خطط تقسيط متنوعة تناسب احتياجاتك'
  },
  {
    icon: Clock,
    title: 'موافقة سريعة',
    description: 'إجراءات سريعة وموافقة فورية'
  }
];

export function BankInstallment() {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead
        title="التقسيط البنكي | اير هاوس - قسط مشترياتك بسهولة"
        description="قسط مشترياتك من التكييفات من خلال أكبر البنوك في مصر. إجراءات سهلة وسريعة، موافقة فورية، وأقساط مريحة."
        keywords="تقسيط بنكي, تقسيط تكييف, بنك مصر, البنك الأهلي, CIB, مشرق, تقسيط بدون فوائد"
        url="https://frozeonix.netlify.app/installment/bank"
      />
      
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              التقسيط البنكي
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              نقبل التقسيط من خلال أكبر البنوك في مصر بإجراءات سهلة وسريعة
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <span>ابدأ التسوق</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.section>

          {/* Banks Grid */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-center mb-12">
              البنوك المعتمدة للتقسيط
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {banks.map((bank, index) => (
                <motion.div
                  key={bank.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-square flex items-center justify-center p-4">
                    <img
                      src={bank.logo}
                      alt={bank.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="text-center font-medium mt-4">{bank.name}</h3>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Benefits Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.section>
        </div>
      </div>
    </>
  );
}