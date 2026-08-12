import {useEffect, useState, useSyncExternalStore} from 'react';
import {readAttribution} from '../data/contactAttribution';
import {defaultTopic, payloadFromForm, topicFromSearch, topicOptions} from '../data/contactForm';
import {contactEmail} from '../data/site';
import Link from './Link';

const endpoint = 'https://hekswerk-intake.levi-020.workers.dev/';

function AutomationFields() {
  return (
    <fieldset className="conditional-fields">
      <legend>About the workflow</legend>
      <p className="field-note">
        Plain language is useful. Describe the work as it happens now rather than trying to design the solution.
      </p>
      <label>
        Organization <span className="field-optional">Optional</span>
        <input name="organization" autoComplete="organization" />
      </label>
      <label>
        What process repeats?
        <textarea name="repeating_process" rows="4" required />
      </label>
      <label>
        What tools or systems are involved? <span className="field-optional">Optional</span>
        <input name="systems_involved" placeholder="For example: email, forms, spreadsheets, a CRM, or documents" />
      </label>
      <label>
        What currently takes too long, gets missed, or fails? <span className="field-optional">Optional</span>
        <textarea name="current_problem" rows="3" />
      </label>
      <div className="field-grid">
        <label>
          Approximate frequency <span className="field-optional">Optional</span>
          <select name="approximate_frequency" defaultValue="">
            <option value="">Choose one</option>
            <option>Several times a day</option>
            <option>Daily</option>
            <option>Several times a week</option>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Less often or irregular</option>
            <option>Not sure</option>
          </select>
        </label>
        <label>
          Desired timing <span className="field-optional">Optional</span>
          <select name="desired_timing" defaultValue="">
            <option value="">Choose one</option>
            <option>As soon as practical</option>
            <option>Within one month</option>
            <option>Within three months</option>
            <option>Later this year</option>
            <option>Exploring for now</option>
          </select>
        </label>
      </div>
      <label>
        Does this workflow involve sensitive or regulated information?
        <select name="sensitive_or_regulated" defaultValue="" required>
          <option value="" disabled>
            Choose one
          </option>
          <option>No</option>
          <option>Yes</option>
          <option>Unsure</option>
        </select>
        <span className="field-note">
          Answer at a high level. Do not identify people or include records, credentials, or protected data here.
        </span>
      </label>
    </fieldset>
  );
}

function RelocationFields() {
  return (
    <fieldset className="conditional-fields">
      <legend>About the move</legend>
      <p className="field-note">
        Keep this high-level. A city or country and approximate timing are enough if they matter. Do not include an
        address, identity number, immigration file, medical detail, legal document, or financial record.
      </p>
      <label>
        What would you like help with?
        <textarea name="message" rows="5" required />
      </label>
    </fieldset>
  );
}

function MessageField({topic}) {
  const prompt =
    topic === 'research' ? 'What would you like to explore or discuss?' : 'What would you like to ask or tell me?';
  return (
    <label>
      {prompt}
      <textarea name="message" rows="6" required />
    </label>
  );
}

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
    let attribution = {};
    try {
      attribution = readAttribution(window.location, window.sessionStorage);
    } catch {
      attribution = readAttribution(window.location, {getItem: () => null});
    }
    const payload = payloadFromForm(form, topic, attribution);

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
        What is this about?
        <select name="topic" value={topic} onChange={(event) => setSelectedTopic(event.target.value)}>
          {topicOptions.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {topic === 'automation' && <AutomationFields />}
      {topic === 'relocation' && <RelocationFields />}
      {(topic === 'research' || topic === 'general') && <MessageField topic={topic} />}

      <p className="form-boundary-note">
        Sending an inquiry does not establish a client relationship. Work begins only after scope and terms are agreed
        in writing.
      </p>

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
      <noscript>
        <p className="form-status">
          This form needs JavaScript. You can email <a href={`mailto:${contactEmail}`}>{contactEmail}</a> instead.
        </p>
      </noscript>
    </form>
  );
}
