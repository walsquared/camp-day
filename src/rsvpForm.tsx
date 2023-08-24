import React, { useCallback, useState } from 'react';

import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon, UpdateIcon } from '@radix-ui/react-icons';

export default function RSVPForm() {
  const [formState, setFormState] = useState<
    'idle' | 'loading' | 'submitted' | 'failed'
  >('idle');

  const [name, setName] = useState('');
  const [soloRSVP, setSoloRSVP] = useState(false);
  const onCheckedChanged = useCallback(
    (checked: Checkbox.CheckedState) => setSoloRSVP(checked === true),
    []
  );

  const [firstTeammate, setFirstTeammate] = useState<string>('');
  const [secondTeammate, setSecondTeammate] = useState<string>('');
  const [teamName, setTeamName] = useState<string>('');

  const [errors, setErrors] = useState({
    name: false,
    firstTeammate: false,
    secondTeammate: false,
  });

  const onTextFieldChange = useCallback(
    (field: 'name' | 'firstTeammate' | 'secondTeammate' | 'teamName') =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (field) {
          case 'name':
            if (e.target.value.trim() !== '')
              setErrors((prev) => ({ ...prev, name: false }));
            return setName(e.target.value);
          case 'firstTeammate':
            if (e.target.value.trim() !== '')
              setErrors((prev) => ({ ...prev, firstTeammate: false }));
            return setFirstTeammate(e.target.value);
          case 'secondTeammate':
            if (e.target.value.trim() !== '')
              setErrors((prev) => ({ ...prev, secondTeammate: false }));
            return setSecondTeammate(e.target.value);
          case 'teamName':
            return setTeamName(e.target.value);
        }
      },
    []
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let errors = false;

      if (name.trim() === '') {
        errors = true;
        setErrors((prev) => ({ ...prev, name: true }));
      }

      if (!soloRSVP && firstTeammate.trim() === '') {
        errors = true;
        setErrors((prev) => ({ ...prev, firstTeammate: true }));
      }

      if (!soloRSVP && secondTeammate.trim() === '') {
        errors = true;
        setErrors((prev) => ({ ...prev, secondTeammate: true }));
      }

      if (errors) return;

      setFormState('loading');

      const { currentTarget: form } = e;

      let formData = new FormData(form);
      let xhr = new XMLHttpRequest();

      console.log({
        name,
        soloRSVP,
        firstTeammate,
        secondTeammate,
        teamName,
      });

      xhr.open('POST', form.action, true);

      xhr.onload = () => {
        console.log('onload', xhr.status, xhr);
        if (xhr.status === 200) {
          setFormState('submitted');
          form.reset();
        } else {
          setFormState('failed');
        }
      };

      xhr.send(formData);
    },
    [name, soloRSVP, firstTeammate, secondTeammate, teamName]
  );

  switch (formState) {
    case 'loading': {
      return (
        <div className="formResult">
          <UpdateIcon className="loadingIcon" />
        </div>
      );
    }
    case 'submitted': {
      return (
        <div className="formResult">
          <p className="resultMessage">
            You're all set! See you on Saturday
            <span title="Bye now :)" aria-label="love">
              👋🏿
            </span>
          </p>
        </div>
      );
    }
    case 'failed': {
      return (
        <div className="formResult">
          <p className="resultMessage">
            Oh no! Something went wrong <span aria-label="love">😭</span>
            <br />
            <br />
            Refresh the page and try again. If that doesn't work please tell
            Wal!
          </p>
        </div>
      );
    }
    default: {
      return (
        <>
          <small className="rsvpMessage">
            <i>This is an RSVP, please use real names so I know who's coming</i>
          </small>
          <form
            onSubmit={onSubmit}
            method="POST"
            action="https://usebasin.com/f/70ab1422c403"
          >
            <label>
              <input
                placeholder="Your name"
                name="name"
                value={name}
                onChange={onTextFieldChange('name')}
              />
              {errors.name && (
                <small className="inputError">Please provide a name.</small>
              )}
              Name
            </label>
            <label className="checkboxInput">
              <Checkbox.Root
                className="checkboxRoot"
                name="solo-rsvp"
                checked={soloRSVP}
                onCheckedChange={onCheckedChanged}
              >
                <Checkbox.Indicator className="checkboxIndicator">
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Match me with teammates at the event
            </label>

            {!soloRSVP && (
              <>
                <label>
                  <input
                    placeholder="Thing 1"
                    name="first-teammate"
                    value={firstTeammate}
                    onChange={onTextFieldChange('firstTeammate')}
                  />
                  {errors.firstTeammate && (
                    <small className="inputError">Please provide a name.</small>
                  )}
                  Teammate #1
                </label>
                <label>
                  <input
                    placeholder="Thing 2"
                    name="second-teammate"
                    value={secondTeammate}
                    onChange={onTextFieldChange('secondTeammate')}
                  />
                  {errors.secondTeammate && (
                    <small className="inputError">Please provide a name.</small>
                  )}
                  Teammate #2
                </label>
                <label>
                  <input
                    placeholder="i.e. Fabulous Fencers"
                    name="team-name"
                    value={teamName}
                    onChange={onTextFieldChange('teamName')}
                  />
                  Team name (optional)
                </label>
              </>
            )}

            <p className="disclaimer">
              By submitting this form, participants release and forever
              discharge Camp Wally West and Wally West representatives, who also
              shall not be held liable for any injury to any person or for any
              loss or damage to property of participants which has been or may
              be sustained as a consequence of the participants' participation
              in the activities described above, and should recognize that this
              is all a bit and nothing should be taken seriously, and not
              withstanding that such damage, loss, or injury may have been
              caused solely or partly by the negligence of Camp Wally West.
            </p>
            <button type="submit" className="submitButton">
              {soloRSVP ? 'I' : 'We'}'ll be there!
            </button>
          </form>
        </>
      );
    }
  }
}
