import styled from 'styled-components'

const UpdateForm =  styled.form`
    background-color: var(--dark);
    margin: 25px;
    padding: 20px;
    overflow: hidden;
    border-radius: 10px;
    display: flex;
    width: 95%;
    gap: 30px;
    flex-wrap: wrap;

    h3 {
        color: var(--primary);
    }
`

const ProfilePic = styled.img`
    border-radius: 50%;
    border: 1px solid black;
    aspect-ratio: 1/1;
    width: 7rem;
`

const UpdateFormSection = styled.div`
    padding: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-basis: 100%;

    > input {
        color: var(--primary);
        font-size: 0.75em;
    }
`

const UpdateProfilePicWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 2%;
`

export {UpdateForm, ProfilePic, UpdateProfilePicWrapper, UpdateFormSection}