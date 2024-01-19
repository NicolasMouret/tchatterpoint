"use client";

import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";
import { Button, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { useFormState } from "react-dom";

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
        <Textarea
          classNames={{ inputWrapper: ["bg-slate-950 bg-opacity-80 backdrop-blur-md", 
          "border border-slate-600 border-opacity-50",
          "dark:hover:bg-opacity-60 dark:hover:backdrop-blur-md dark:hover:bg-slate-950",
          "group-data-[focus=true]:bg-opacity-85 group-data-[focus=true]:backdrop-blur-lg", 
          "group-data-[focus=true]:bg-slate-950 group-data-[focus=true]:border-opacity-100"],        
          errorMessage: "text-red-200 bg-rose-950 p-1 pl-2 rounded bg-opacity-90 backdrop-blur-sm",
          base: "box-content"
          }}
          name="content"
          value={message}
          onChange={e => setMessage(e.target.value)}
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
          className="font-medium text-base min-w-[130px] w-2/5 self-center"
          color="primary">Envoyer</FormButton>
      </div>
    </form>
  );

  return (
    <>
      <Button size="sm" variant="light" onClick={() => setOpen(!open)}>
        Envoyer un message
      </Button>
      {open && form}
    </>
  );
}
