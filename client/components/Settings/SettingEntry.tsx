import SettingModal from "./SettingModal";
import { getStyleString } from "@helpers/utility";
import SettingEntryStyling from "./SettingEntry.module.scss";
import { useState } from "react";

const SettingEntry = ({ attributeName }: { attributeName: string }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          setShowModal(true);
        }}
        className={getStyleString(SettingEntryStyling.entry, "flex")}
      >
        <p>Change your {attributeName}</p>
      </div>

      <SettingModal
        attributeName={attributeName}
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      />
    </>
  );
};

export default SettingEntry;
