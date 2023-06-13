import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
import QrGenerator from "./QrGenerator";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const svgFile = (
  <svg
    className={classes.modal_svg}
    width="1024"
    height="1024"
    viewBox="0 0 1024 1024"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M277.888 0H478.89L201.723 740.66H0L277.888 0Z" fill="#FF5500" />
    <path
      d="M713.667 0H914.67L637.502 740.66H435.78L713.667 0Z"
      fill="#FF5500"
    />
    <path d="M478.893 0L597.462 265.942H357.244L478.893 0Z" fill="#FF5500" />
    <path
      d="M387.217 283.34H588.22L311.052 1024H109.33L387.217 283.34Z"
      fill="#FFA400"
    />
    <path
      d="M822.997 283.34H1024L746.832 1024H545.109L822.997 283.34Z"
      fill="#FFA400"
    />
    <path
      d="M431.159 755.573L546.649 1021.51L655.979 755.573H431.159Z"
      fill="#FFA400"
    />
  </svg>
);

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.modal_content}>
        <header className={classes.modal_header}>{svgFile}</header>
        <div className={classes.modal_main}>
          <QrGenerator
            number="0001"
            name="abc"
            price="30000"
            platformname="nangnang"
          />
        </div>
        <footer className={classes.modal_footer}>
          <button
            className={classes.modal_footer_button}
            onClick={props.onClose}
          >
            확인
          </button>
        </footer>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={props.onClose} />,
        portalElement
      )}
    </>
  );
};

export default Modal;
