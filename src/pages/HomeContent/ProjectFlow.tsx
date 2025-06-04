import React from "react";
import { Card } from "@heroui/react";
import { motion } from "framer-motion";

interface FlowStep {
  number: number;
  title: string;
  description: string;
}

const flowSteps: FlowStep[] = [
  {
    number: 1,
    title: "Kavşaklardan Görüntü Toplanması",
    description: "Farklı şehirlerdeki kavşaklardan İHA kullanılarak görüntü toplanır."
  },
  {
    number: 2,
    title: "Taşıt ve Yaya Tespit Sisteminin Geliştirilmesi",
    description: "Kavşak kullanıcıları etiketlenir ve YOLO modelleri test edilir."
  },
  {
    number: 3,
    title: "Yörünge ve Vekil Güvenlik Ölçütü (VGÖ) Belirleme",
    description: "Kullanıcı yörüngeleri ve çatışmalar belirlenir, VGÖ hesaplanır."
  },
  {
    number: 4,
    title: "Filtre Modelinin Geliştirilmesi",
    description: "Riskli olaylar filtrelenerek analiz için sınıflandırılır."
  },
  {
    number: 5,
    title: "Risk Sınıfının (RS) Belirlenmesi",
    description: "Filtrelenen olaylar analiz edilerek risk sınıfları belirlenir."
  }
];

const ProjectFlow: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3 // Her bir adım arasındaki gecikme
      }
    }
  };

  const item = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="w-full">
      <motion.div 
        initial="hidden"
        animate="show"
        variants={container}
        className="space-y-3 sm:space-y-4 lg:space-y-6"
      >
        <motion.h2 
          variants={item}
          className="text-xl font-bold mb-4 text-center"
        >
          Kavşak Görüntü Verisi Toplama ve Analiz Süreçleri
        </motion.h2>

        {flowSteps.map((step, index) => (
          <motion.div 
            key={step.number} 
            className="relative"
            variants={item}
          >
            {/* Bağlantı çizgisi */}
            {index < flowSteps.length - 1 && (
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 top-[100%] w-0.5 h-3 sm:h-4 bg-primary-500"
                initial={{ height: 0 }}
                animate={{ height: "1rem" }}
                transition={{ delay: 0.5 + (index * 0.3), duration: 0.3 }}
              />
            )}
            
            {/* Adım kartı */}
            <Card className="relative transform hover:scale-105 transition-transform duration-300 w-full">
              <div className="p-3 sm:p-4">
                <div className="flex items-start gap-3">
                  {/* Numara dairesi */}
                  <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-primary-500 flex items-center justify-center mt-0.5">
                    <span className="text-white font-bold text-sm sm:text-base lg:text-lg">
                      {step.number}
                    </span>
                  </div>
                  
                  {/* İçerik */}
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold mb-1 text-black dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-base text-black/80 dark:text-white/80">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>    
        ))}
      </motion.div>
    </div>
  );
};

export default ProjectFlow; 