// This is boilerplate navigation for sample purposes. Most apps should throw this away and use their own navigation implementation.

import { getPublicUrl } from "@sitecore-jss/sitecore-jss-nextjs";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link';

const publicUrl = getPublicUrl();

// Most apps may also wish to use GraphQL for their navigation construction; this sample does not simply to support disconnected mode.
const Navigation = () => {
  const { data: session } = useSession();

  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom">
      <h5 className="my-0 mr-md-auto font-weight-normal">
        <Link href="/">
          <a className="text-dark">
            <img src={`${publicUrl}/ONFS-logo_no-tag.svg`} alt="Sitecore" width="200" />
          </a>
        </Link>
      </h5>
      <nav className="my-2 my-md-0 mr-md-3">
        {!session && (
          <>
            <span>You are not signed in</span>
            <br />
            <a
              href={`/api/auth/signin`}
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              Sign in
            </a>
          </>
        )}
        {session?.user && (
          <>
            <span style={{ backgroundImage: `url(${session.user.image})` }} />
            <span>
              <small>Signed in as</small>
              <br />
              <strong>{session.user.email || session.user.name}</strong>
            </span>
            <a
              href={`/api/auth/signout`}
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              Sign out
            </a>
          </>
        )}
      </nav>
    </div>
  );
};


export default Navigation;