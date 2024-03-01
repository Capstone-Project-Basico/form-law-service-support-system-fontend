import { Button } from "@nextui-org/react";
import { useState } from "react";

const AddTemplate = () => {
  const [file, setFile] = useState<File>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch(
        "https://demo-production-b43a.up.railway.app/file/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) throw new Error(await res.text());
    } catch (error) {
      console.error(e);
    }
  };
  const submit = async () => {};
  return (
    <form onSubmit={onSubmit}>
      <input
        type="file"
        name="file"
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <Button
        type="submit"
        value="upload"
        color="primary"
        radius="full"
        size="sm"
      >
        Submit
      </Button>
    </form>
  );
};

export default AddTemplate;
