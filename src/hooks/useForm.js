import { useCallback, useRef, useState } from 'react';
import { validate, validateField } from '../utils/validators';

// Reusable controlled-form hook.
//   values       – one state object holding every field (controlled inputs)
//   errors       – { fieldName: 'message' } shown inline under each field
//   handleChange – works for text / number / select / checkbox via the input's `name`
//   handleBlur   – validates a field when the user leaves it
//   handleSubmit – preventDefault -> validate everything -> call onSubmit only if valid
//   submitting   – true while onSubmit (async) runs; used to disable the button
//   submitError  – message when onSubmit throws (e.g. "Incorrect password")
export default function useForm({ initialValues, schema, onSubmit }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const busy = useRef(false); // guards against double-submit even before React re-renders

  const setFieldError = (name, msg) => setErrors((prev) => ({ ...prev, [name]: msg }));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const next = { ...values, [name]: type === 'checkbox' ? checked : value };
    setValues(next);
    // once a field is showing an error, re-check it live so the message clears as soon as it's fixed
    if (errors[name]) setFieldError(name, validateField(name, next, schema));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setFieldError(name, validateField(name, values, schema));
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (busy.current) return;
    setSubmitError('');
    const found = validate(values, schema);
    setErrors(found);
    if (Object.keys(found).length) return; // invalid -> do not submit
    busy.current = true;
    setSubmitting(true);
    try {
      await onSubmit(values);
    } catch (err) {
      setSubmitError(err && err.message ? err.message : 'Something went wrong. Please try again.');
    } finally {
      busy.current = false;
      setSubmitting(false);
    }
  };

  const reset = useCallback((next) => {
    setValues(next || initialValues);
    setErrors({});
    setSubmitError('');
  }, [initialValues]);

  return { values, setValues, errors, handleChange, handleBlur, handleSubmit, submitting, submitError, setSubmitError, reset };
}
