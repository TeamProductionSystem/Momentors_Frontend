import ProfileMentor from "./ProfileMentor"
import ProfileMentee from "./ProfileMentee"

export default function Profile ({ token, pk, setAuth, mentor, mentee }) {
    if (mentor === true) {
        return (
            <ProfileMentor token={token} pk={pk} setAuth={setAuth} />
        )
    } else if (mentee === true) {
        return (
            <ProfileMentee token={token} pk={pk} setAuth={setAuth} />
        )
    } else {
        return (
            <p>You aren't a mentor or mentee</p>
            )
    }
}