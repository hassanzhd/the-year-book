import Modal from "react-bootstrap/Modal";
import SettingModalStyling from "./SettingModal.module.scss";

const SettingModal = ({
  show,
  attributeName,
  onHide,
}: {
  show: boolean;
  attributeName: string;
  onHide: () => void;
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change your {attributeName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={SettingModalStyling.body}>
        <input placeholder={`Enter new ${attributeName}`} type="text" />
      </Modal.Body>
      <Modal.Footer>
        <button className="button">Update</button>
      </Modal.Footer>
    </Modal>
  );
};

export default SettingModal;
