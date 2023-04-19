import React, { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { BiCommentError } from "react-icons/bi";
import Button from "../../common/Button";
import ReportModal from "../../report-modal";

const Footer = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  return (
    <>
      <ReportModal
        close={() => setIsReportModalOpen(false)}
        isModalOpen={isReportModalOpen}
      />
      <footer className="mt-auto flex h-12 w-full items-center justify-between bg-light px-4 text-2xs text-xs text-primary dark:bg-dark dark:text-light">
        <div className="flex w-full items-center justify-between">
          <div className="text-sm">&copy; 2023 Plecak.</div>
          <a
            target="_blank"
            rel="noreferrer"
            className="text-3xl"
            href="https://github.com/sheep2moon"
          >
            <AiFillGithub />
          </a>
          <Button
            variant="minimal"
            className="ml-auto flex items-center gap-1"
            onClick={() => setIsReportModalOpen(true)}
          >
            <BiCommentError />
            Zgłoś problem
          </Button>
        </div>
      </footer>
    </>
  );
};

export default Footer;
