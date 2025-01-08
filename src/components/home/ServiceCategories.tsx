import { ServiceCategoryCard } from "./ServiceCategoryCard";

interface ServiceCategoriesProps {
  translations: {
    services: {
      dogTraining: string;
      heartCare: string;
      homeRepair: string;
      security: string;
      painting: string;
      otherServices: string;
    };
  };
}

export const ServiceCategories = ({ translations }: ServiceCategoriesProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
      <ServiceCategoryCard icon="🐕" title={translations.services.dogTraining} />
      <ServiceCategoryCard icon="❤️" title={translations.services.heartCare} />
      <ServiceCategoryCard icon="🔨" title={translations.services.homeRepair} />
      <ServiceCategoryCard icon="🛡️" title={translations.services.security} />
      <ServiceCategoryCard icon="🎨" title={translations.services.painting} />
      <ServiceCategoryCard icon="⚙️" title={translations.services.otherServices} />
    </div>
  );
};