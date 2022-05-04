import styled from 'styled-components'

const UpdateForm =  styled.form`
    padding: 2%;
    overflow: hidden;
    border-radius: 10px;
    display: flex;
    width: 80vw;
    gap: 30px;
    flex-wrap: wrap;
`

const ProfilePic = styled.img`
    border-radius: 50%;
    border: 1px solid black;
    height: 130px;
    width: 130px;
`

const UpdateFormSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-basis: 100%;
`

const UpdateProfilePicWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 50px;
`

export {UpdateForm, ProfilePic, UpdateProfilePicWrapper, UpdateFormSection}