type FormTemplateVersionReq = {
  message: string;
  price: number;
  file: File;
  formTemplateId: number;
};

type FormTemplateVersion = {
  // id: 21;
  // createBy: null;
  // createdAt: '2024-03-26T15:27:48.136Z';
  // fileUrl: 'fileUrl';
  // message: 'new';
  // price: 15;
  // versionNumber: 'v9';
  // formTemplateId: 1;
  // status: 'UNSTANDARDIZED';
  id: number;
  createBy: string | null;
  createdAt: string | null;
  fileUrl: string;
  message: string;
  price: number;
  versionNumber: string;
  formTemplateId: number;
  status: string;
  formTypeId: number;
};
