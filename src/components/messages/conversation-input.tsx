"use client";

import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";
import { FormTextarea } from "../common/form-inputs";


interface SendMessageFormProps {
  chatId: string;
}

export default function ChatInputForm({
  chatId
}: SendMessageFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState("");
  const [formState, action] = useFormState(
    actions.createMessageChat.bind(null, { chatId }),
    { errors: {} }
  );


  return (
    <form ref={formRef} action={action} onSubmit={() => setMessage("")} className="w-full mt-2">
      <div className={`space-y-2 px-1 mt-1 w-full flex flex-col`}>
        <FormTextarea
          name="content"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => {if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            formRef.current?.requestSubmit();
          }}}
          label="Message"
          placeholder="Votre message..."
          errorMessage={formState.errors.content?.join(", ")}
        />

        {formState.errors._form ? (
          <div className="p-2 bg-red-200 border rounded border-red-400">
            {formState.errors._form?.join(", ")}
          </div>
        ) : null}

        <FormButton
          className="font-medium text-base min-w-[130px] w-1/5 self-end"
          color="primary">Envoyer
        </FormButton>
      </div>
    </form>
  );
}