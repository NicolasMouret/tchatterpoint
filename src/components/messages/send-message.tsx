"use client";

import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useFormState } from "react-dom";
import FormErrorDisplay from "../common/form-error-warning";
import { FormTextarea } from "../common/form-inputs";

interface SendMessageFormProps {
  receiverId: string;
}

export default function SendMessageForm({
  receiverId,
}: SendMessageFormProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [formState, action] = useFormState(
    actions.createMessageProfile.bind(null, { receiverId }),
    { errors: {} }
  );


  const form = (
    <form action={action} onSubmit={() => {setMessage("")}} className="w-full mt-2">
      <div className={`space-y-2 px-1 mt-1 w-full`}>
        <FormTextarea
          name="content"
          value={message}
          onChange={e => setMessage(e.target.value)}
          label="Message"
          placeholder="Votre message..."
          errorMessage={formState.errors.content?.join(", ")}
        />
        {formState.errors._form ? 
          <FormErrorDisplay errors={formState.errors._form} /> : null}
        <FormButton
          className="font-medium text-base min-w-[130px] w-2/5 self-center"
          color="primary"
          variant="shadow"
          >
            Envoyer
        </FormButton>
      </div>
    </form>
  );

  return (
    <>
      <Button 
        className="font-semibold"
        size="sm" 
        variant="shadow" 
        color="warning" 
        onClick={() => setOpen(!open)}>
        Envoyer un message
      </Button>
      {open && form}
    </>
  );
}