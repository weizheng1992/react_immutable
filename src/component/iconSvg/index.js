import Icon from "../../img/svg/icon.svg";
const IconSvg = ({ glyph, viewBox = "0 0 1024 1024", fill, className }) => {
  return (
    <svg className={className} viewBox={viewBox} fill={fill}>
      <use xlinkHref={`#${Icon.id}_${glyph}`} />
    </svg>
  );
};
export default IconSvg;
