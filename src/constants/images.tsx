import kku_logo_145x150 from "../assets/kku_logo_145x150.png";
import tubitak_logo from "../assets/tubitak_logo.jpg";
import project_logo from "../assets/project_logo.png";
import project_details_01 from "../assets/project_detail_01.jpg";

import ali_payidar_akgungor from "../../public/ali_payidar_akgungor.jpg";
import enes_ayan from "../../public/enes_ayan.jpg";
import erdem_dogan from "../../public/erdem_dogan.jpg";
import ersin_korkmaz from "../../public/ersin_korkmaz.jpg";
import onur_caydere from "../../public/onur_caydere.jpg";
import hakan_yildirim from "../../public/hakan_yildirim.jpg";
import rabia_begen from "../../public/rabia_begen.jpg";


interface Members {
  ali_payidar_akgungor: string;
  enes_ayan: string;
  erdem_dogan: string;
  ersin_korkmaz: string;
  onur_caydere: string;
  hakan_yildirim: string;
  rabia_begen: string;
}

interface Images {
  header_logo: string;
  tubitak_logo: string;
  project_logo: string;
  members: Members;
  project_details_01: string;
}

const images: Images = {
  header_logo: kku_logo_145x150,
  tubitak_logo: tubitak_logo,
  project_logo: project_logo,
  project_details_01: project_details_01,
  members: {
    ali_payidar_akgungor: ali_payidar_akgungor,
    enes_ayan: enes_ayan,
    erdem_dogan: erdem_dogan,
    ersin_korkmaz: ersin_korkmaz,
    onur_caydere: onur_caydere,
    hakan_yildirim: hakan_yildirim,
    rabia_begen: rabia_begen,
  },
};

export default images;
