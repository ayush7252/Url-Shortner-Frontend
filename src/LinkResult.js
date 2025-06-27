import axios from "axios";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

const LinkResult = ({ inputValue }) => {
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`https://url-shortner-2pf2.onrender.com/api/shorten`, {
        originalUrl: inputValue,
      });

      setShortenLink(res.data.shortUrl);
      console.log(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputValue.length) {
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [copied]);

  if (loading) {
    return <p className="noData">Loading...</p>;
  }
  if (error) {
    return <p className="noData">Something went wrong :(</p>;
  }

  return (
    <div className="result-container">
      {shortenLink && (
        <div className="result">
          <p>
            Short URL:{" "}
            <a
              href={shortenLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {shortenLink}
            </a>
          </p>
          <CopyToClipboard text={shortenLink} onCopy={() => setCopied(true)}>
            <button className={`px-3 py-1 rounded-xl text-white ${copied ? "bg-green-500" : "bg-blue-500"}`}>
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
          </CopyToClipboard>
        </div>
      )}
    </div>
  );
};

export default LinkResult;
