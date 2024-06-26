export type FormTemplate = {
  formTemplateId?: number;
  latestVersion?: FormTemplateVersion;
  formTypeName: string;
  formTypeId: number;
  title: string;
  description: string;
};

export type FormTemplateRequest = {
  formTypeId: number;
  title: string;
  description: string;
};
