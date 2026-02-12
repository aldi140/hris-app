export const FILTER_CONFIG = {
  id_departemen: {
    label: "Departemen",
    emptyValue: "",
    format: (v, helpers) => helpers.getDepartmenName(Number(v)),
  },
  id_kantor: {
    label: "Kantor",
    emptyValue: "",
    format: (v, helpers) => helpers.getOfficeName(v),
  },
  id_jabatan: {
    label: "Jabatan",
    emptyValue: "",
    format: (v, helpers) => helpers.getJabatanName(Number(v)),
  },
};
