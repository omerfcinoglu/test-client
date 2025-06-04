import React, { useState } from "react";
import { Input, Button, Textarea, Card, Spacer } from "@heroui/react";

const Base64Cleaner: React.FC = () => {
  const [htmlInput, setHtmlInput] = useState<string>("");
  const [convertedHtml, setConvertedHtml] = useState<string>("");

  const handleConvert = () => {
    const base64Regex = /data:image\/[a-zA-Z]+;base64,[^\s"]+/g;
    const updatedHtml = htmlInput.replace(base64Regex, "PLACEHOLDER_IMAGE_URL");
    setConvertedHtml(updatedHtml);
  };

  return (
    <Card style={{ maxWidth: "600px", padding: "20px", margin: "auto" }}>
      <h2>Base64 Cleaner</h2>
      <Input
        fullWidth
        label="HTML Input"
        placeholder="Paste your HTML content here"
        style={{ marginBottom: "10px" }}
        value={htmlInput}
        onChange={(e) => setHtmlInput(e.target.value)}
      />
      <Spacer y={0.5} />
      <Button color="primary" onPress={handleConvert}>
        Convert HTML
      </Button>
      <Spacer y={1} />
      <Textarea
        fullWidth
        readOnly
        label="Cleaned HTML"
        placeholder="Converted HTML will appear here"
        rows={10}
        value={convertedHtml}
      />
    </Card>
  );
};

export default Base64Cleaner;
