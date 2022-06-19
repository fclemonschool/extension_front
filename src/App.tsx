import React, {ChangeEvent, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css'
import './App.css';
import {Button, CloseButton, Col, Container, Form, FormLabel, Row} from "react-bootstrap";
import {extensionService} from "./services";
import {Extension} from "./types/extension.types";
import {ToastContainer} from "react-toastify";

const App: React.FC = () => {
  const [fixed, setFixed] = useState<Extension[]>([])
  const [custom, setCustom] = useState<Extension[]>([])
  const [fileExtension, setFileExtension] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      await getResponseByType("FIXED");
      await getResponseByType("CUSTOM");
    }
    fetchData()
  }, [])

  const onAddCustomClick = async (fileExtension: string) => {
    await extensionService.create({
      type: 'CUSTOM',
      fileExtension: fileExtension,
      used: false
    })
    await getResponseByType("CUSTOM");
  }

  const onUpdateClick = async (event: ChangeEvent<HTMLInputElement>) => {
    await extensionService.updateUsed(event.target.id, {used: event.target.checked})
    await getResponseByType("FIXED");
  }

  const getResponseByType = async (type: "FIXED" | "CUSTOM") => {
    const response = await extensionService.listByType(type)
    if (type === "FIXED") {
      setFixed(response.contents)
    } else {
      setCustom(response.contents)
    }
  }

  const onDeleteClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    await extensionService.delete(event.currentTarget.id)
    await getResponseByType("CUSTOM");
  }

  return (
    <>
      <ToastContainer hideProgressBar/>
      <div className="App">
        <Container fluid={"lg"} className={"mt-3 mb-3 p-4"}>
          <Row className={"mb-3 border-bottom border-2 border-dark"}>
            <Col className={"text-start fs-3 mb-2"}>◎ 파일확장자 차단</Col>
          </Row>
          <Row className={"mb-3"}>
            <Col className={"text-start"}>파일 확장자에 따라 특정 형식의 파일을 첨부하거나 전송하지 못하도록 제한</Col>
          </Row>
          <Row className={"mb-3"}>
            <FormLabel className={"col-2 text-start"}>고정 확장자</FormLabel>
            <Col className={"d-flex flex-row"}>{fixed.map((item: Extension) => {
              return <Col key={item.id}><Form.Check
                type={"checkbox"}
                id={item.id}
                label={item.fileExtension}
                checked={item.used}
                onChange={onUpdateClick}/></Col>;
            })}</Col>
          </Row>
          <Row className={"mb-3"}>
            <FormLabel className={"col-2 text-start"}>커스텀 확장자</FormLabel>
            <Col className={"d-flex flex-row"}>
              <Form className={"d-flex"}>
                <Form.Control type={"text"} size={"sm"} maxLength={20}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => setFileExtension(e.target.value)}/>
                <Button type={"reset"} variant="secondary" size={"sm"} className={"ms-1"} style={{width: '70px'}}
                        onClick={() => onAddCustomClick(fileExtension)}>+추가</Button>
              </Form>
            </Col>
          </Row>
          <Row className={"mb-3"}>
            <Col className={"col-2"}/>
            <Col className="custom-items">
              <Col className="custom-items-area">
                <Col className="custom-items-count">{custom.length}/200</Col>
                {custom.map((item: Extension) => {
                  return <Col className={"custom-item"} key={item.id}>{item.fileExtension}
                    <CloseButton id={item.id} className={"ms-1"} onClick={onDeleteClick}/></Col>;
                })}
              </Col>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default App
