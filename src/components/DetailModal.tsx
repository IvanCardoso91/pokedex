import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; 

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  attack: {
    name: string;
    cost: string[];
    damage: string;
    description: string;
  };
}

const modalDetailStyles = {
   modalOverlayStyles: "fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center md:items-center items-end transition-opacity duration-300",
   modalContentStyles: "bg-white rounded-t-lg md:rounded-lg shadow-lg w-full md:w-1/2 max-h-full overflow-y-auto transform transition-all duration-300",
   closeButtonStyles: "text-red-500 font-bold absolute top-4 right-4",
   titleStyles: "text-2xl font-bold text-gray-800 mb-4",
   sectionTitleStyles: "text-lg font-semibold",
   sectionTextStyles: "text-gray-600",
};

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose, attack }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    }
  }, [isOpen]);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setShowModal(false);
    }
  };

  if (!showModal) return null;

  return (
    <div
      className={`${modalDetailStyles.modalOverlayStyles} ${isOpen ? "opacity-100" : "opacity-0"
      }`}
      onTransitionEnd={handleTransitionEnd}
    >
      <div
        className={`${modalDetailStyles.modalContentStyles} ${isOpen ? "translate-y-0 md:translate-y-0 md:scale-100" : "translate-y-full md:translate-y-0 md:scale-95"
        }`}
      >
        <button
          className={modalDetailStyles.closeButtonStyles}
          onClick={onClose}
        >
          Fechar
        </button>
        <div className="p-6">
          <h2 className={modalDetailStyles.titleStyles}>{attack.name}</h2>
          <div className="mb-4">
            <h3 className={modalDetailStyles.sectionTitleStyles}>{t("pokemon_details.mana_cost")}:</h3>
            <p className={modalDetailStyles.sectionTextStyles}>{attack.cost.join(", ")}</p>
          </div>
          <div className="mb-4">
            <h3 className={modalDetailStyles.sectionTitleStyles}>{t("pokemon_details.damage")}:</h3>
            <p className={modalDetailStyles.sectionTextStyles}>{attack.damage}</p>
          </div>
          <div>
            <h3 className={modalDetailStyles.sectionTitleStyles}>{t("pokemon_details.description")}:</h3>
            <p className={modalDetailStyles.sectionTextStyles}>{attack.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
