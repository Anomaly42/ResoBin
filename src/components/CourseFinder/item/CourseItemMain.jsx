import { Bookmark, BookmarkOutline } from '@styled-icons/zondicons'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components/macro'

import { ButtonIcon, toast, Typography } from 'components/shared'
import { API } from 'config/api'
import { coursePageUrl } from 'helpers/format'
import { selectDepartments } from 'store/courseSlice'
import { selectFavouriteStatus, updateFavourite } from 'store/userSlice'
import { device, fontSize } from 'styles/responsive'
import { colorPicker } from 'styles/utils'

// TODO: Add highlight for keywords
const CourseItemMain = ({ courseData }) => {
  const dispatch = useDispatch()
  const { code, credits, department, title, description } = courseData

  const [loading, setLoading] = useState(false)

  const favourite = useSelector(selectFavouriteStatus(code))
  const departmentList = useSelector(selectDepartments)

  const favouriteClick = async () => {
    try {
      setLoading(true)
      if (favourite) {
        await API.courses.favorite.remove({ code })
      } else {
        await API.courses.favorite.add({ code })
      }

      dispatch(updateFavourite(code))
    } catch (error) {
      toast({ status: 'error', content: error })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SubTitle>
        <DepartmentContainer
          style={{
            color: colorPicker(
              departmentList.findIndex(({ name }) => name === department.name)
            ),
          }}
        >
          {department.name}
        </DepartmentContainer>

        <RightIcons>
          <CreditContainer small={credits > 9}>{credits}</CreditContainer>

          <ButtonIcon
            tooltip="Add to favorites"
            onClick={favouriteClick}
            icon={
              favourite ? <Bookmark size="25" /> : <BookmarkOutline size="25" />
            }
            color="white"
            loading={loading}
          />
        </RightIcons>
      </SubTitle>

      <TitleContainer to={coursePageUrl(code, title)}>
        <CourseCode>{code}</CourseCode>
        <CourseTitle>{title}</CourseTitle>
      </TitleContainer>

      <Typography.Paragraph
        ellipsis={{ rows: 3, expandable: true, symbol: 'show more' }}
        style={{ marginTop: '0.75rem', marginBottom: 0 }}
      >
        {description?.length ? description : 'No description available'}
      </Typography.Paragraph>
    </>
  )
}

export default CourseItemMain

const TitleContainer = styled(Link)`
  display: inline;
`

const CourseHeader = css`
  display: inline;
  color: ${({ theme }) => theme.textColor};

  ${TitleContainer}:hover & {
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 1.5px;
  }
`

const CourseCode = styled.span`
  margin-right: 0.375rem;
  font-size: ${fontSize.responsive.xl};
  font-weight: 600;

  ${CourseHeader}
`

const CourseTitle = styled.span`
  font-size: ${fontSize.responsive.md};
  font-weight: 400;

  ${CourseHeader}
`

const SubTitle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 1.75rem;
  margin-bottom: 0.5rem;
`

const DepartmentContainer = styled.span`
  display: inline-block;
  width: calc(100% - 3.75rem);
  margin: 0;
  overflow: hidden;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  font-size: ${fontSize.responsive.xs};
  white-space: nowrap;
  text-overflow: ellipsis;

  @media ${device.min.md} {
    font-weight: 500;
  }
`

const RightIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const CreditContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 1rem;
  color: ${({ theme }) => theme.darksecondary};
  font-weight: 600;
  font-size: ${({ small }) =>
    small ? fontSize.responsive.xs : fontSize.responsive.lg};
  background: white;
  border-radius: 50%;

  @media ${device.min.md} {
    width: 1.5rem;
    height: 1.5rem;
  }
`
