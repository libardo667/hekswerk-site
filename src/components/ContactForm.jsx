import {useEffect, useState, useSyncExternalStore} from 'react';
import {defaultTopic, messageLabelForTopic, payloadFromForm, topicFromSearch, topicOptions} from '../data/contactForm';
import {contactEmail} from '../data/site';
import Link from './Link';

const endpoint = 'https://hekswerk-intake.levi-020.workers.dev/';

export default function ContactForm() {
  const queryTopic = useSyncExternalStore(
    () => () => {},
    () => topicFromSearch(window.location.search),
    () => defaultTopic,
  );
  const [selectedTopic, setSelectedTopic] = useState(null);
  const topic = selectedTopic ?? queryTopic;
  const [status, setStatus] = useState({kind: '', message: ''});

  useEffect(() => {
    const currentLocation = window.location;
    if (currentLocation.pathname.endsWith('/contact.html')) {
      window.location.replace(`/contact${currentLocation.search}${currentLocation.hash}`);
    }
  }, []);

  async function submit(event) {
    event.preventDefault();
    setStatus({kind: 'working', message: 'Sending your inquiry...'});

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = payloadFromForm(form, topic);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.error || 'The form could not be sent.');
      }
      formElement.reset();
      setSelectedTopic(defaultTopic);
      setStatus({kind: 'success', message: 'Thank you. Your inquiry has been sent.'});
    } catch (error) {
      setStatus({
        kind: 'error',
        message: `${error.message} You can also email ${contactEmail}.`,
      });
    }
  }

  const isRelocation = topic === 'Relocation planning';
  const messageLabel = messageLabelForTopic(topic);

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="field-grid">
        <label>
          Name
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>

      <label>
        Topic
        <select name="topic" value={topic} onChange={(event) => setSelectedTopic(event.target.value)}>
          {topicOptions.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {isRelocation && (
        <div className="conditional-fields">
          <div className="field-grid">
            <label>
              Current location
              <input name="current_location" />
            </label>
            <label>
              Target location
              <input name="target_location" />
            </label>
          </div>
          <div className="field-grid">
            <label>
              Timeline
              <input name="timeline" />
            </label>
            <label>
              Household
              <input name="household" />
            </label>
          </div>
          <label>
            Anything urgent or sensitive I should know?
            <textarea name="urgent_or_sensitive" rows="3" />
          </label>
        </div>
      )}

      <label>
        {messageLabel}
        <textarea name="message" rows="7" required />
      </label>

      <label className="honeypot" aria-hidden="true">
        Website
        <input name="website" tabIndex="-1" autoComplete="off" />
      </label>

      <label className="privacy-check">
        <input name="privacy_acknowledged" type="checkbox" required />
        <span>
          I have read the <Link to="/privacy">privacy and data-handling note</Link>.
        </span>
      </label>

      <div className="form-footer">
        <button className="button button--primary button--lg" type="submit" disabled={status.kind === 'working'}>
          {status.kind === 'working' ? 'Sending...' : 'Send inquiry'}
        </button>
        <p
          className={`form-status${status.kind ? ` form-status--${status.kind}` : ''}`}
          role="status"
          aria-live="polite"
        >
          {status.message}
        </p>
      </div>
    </form>
  );
}
