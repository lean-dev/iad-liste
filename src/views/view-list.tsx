import { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../config";
import { useFetch } from "../lib/fetch-hook";
import { useDocumentTitle } from "../lib/doc-title";
import { useList } from "../lib/use-list";

type Submission = {
  id: string;
  wer: string;
  was: string;
  wieviele: string;
  listId: string;
};

const styles = {
  h1: { textDecoration: "underline" },
} as const;

export default function ViewListRoute() {
  const navigate = useNavigate();

  const { listId, submissionId } = useParams();

  const list = useList(listId);
  const [submissions, setSubmissions, submissionsLoading] = useFetch(
    `${backendUrl}/submissions?listId=${listId}`,
    [] as Submission[]
  );

  useDocumentTitle(list.title);

  const currentSubmission = submissions.find((s) => s.id === submissionId);

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);
    const submission = Object.fromEntries(formData);
    submission.listId = String(listId);

    if (!currentSubmission) {
      const response = await fetch(`${backendUrl}/submissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      });
      const createdSubmission = await response.json();
      setSubmissions([...submissions, createdSubmission]);
      navigate(`/list/${listId}/${createdSubmission.id}`);
    } else {
      const response = await fetch(
        `${backendUrl}/submissions/${currentSubmission.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submission),
        }
      );
      const updatedSubmission = await response.json();
      setSubmissions(
        submissions.map((s) =>
          s.id !== updatedSubmission.id ? s : updatedSubmission
        )
      );
    }
  }

  return (
    <div>
      <h1 style={styles.h1}>Liste: {list.title}</h1>
      <h2>Was bringt Ihr mit?</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <span>Name:</span>
            <input
              type="text"
              name="wer"
              required
              defaultValue={currentSubmission?.wer}
            />
          </label>
        </div>
        <div>
          <label>
            <span>Was:</span>
            <input
              type="text"
              name="was"
              required
              defaultValue={currentSubmission?.was}
            />
          </label>
        </div>
        <div>
          <label>
            <span>Wieviele:</span>
            <input
              type="text"
              name="wieviele"
              required
              defaultValue={currentSubmission?.wieviele}
            />
          </label>
        </div>
        <button type="submit">Speichern</button>
      </form>
      {submissionsLoading ? (
        <div>Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Wer</th>
              <th>Was</th>
              <th>Wieviele</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s.id}>
                <td>{s.wer}</td>
                <td>{s.was}</td>
                <td>{s.wieviele}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
