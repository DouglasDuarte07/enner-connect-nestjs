"use client";
/* eslint-disable @next/next/no-img-element */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function Homepage() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(0);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const values = Object.fromEntries(data.entries());

    if (
      !values.averageAmount ||
      !values.state ||
      !values.region
    ) {
      toast.error("Preencha todos os campos com valores válidos", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const { averageAmount, state, region }: any = values;
    const hoursOfSunlightPerDay = 5;
    const costPerKW = 5000;
    const installationCost = 2000;
    const scalingFactor = 1.1;

    const systemSizeKW = Number(averageAmount) / (30 * hoursOfSunlightPerDay);

    const stateFactors: Record<string, number> = {
      ac: 1.1,
      al: 1.0,
      ap: 1.2,
      am: 1.3,
      ba: 1.0,
      ce: 0.9,
      df: 1.0,
      es: 1.0,
      go: 1.1,
      ma: 1.2,
      mt: 1.1,
      ms: 1.1,
      mg: 1.0,
      pa: 1.3,
      pb: 0.9,
      pr: 1.0,
      pe: 0.9,
      pi: 1.1,
      rj: 1.0,
      rn: 0.9,
      rs: 1.0,
      ro: 1.2,
      rr: 1.3,
      sc: 1.0,
      sp: 1.0,
      se: 1.0,
      to: 1.2,
    };

    const regionFactors: Record<string, number> = {
      urban: 1.0,
      rural: 1.2,
    };

    const stateFactor = stateFactors[state] || 1.0;
    const regionFactor = regionFactors[region] || 1.0;

    const budget =
      (systemSizeKW * costPerKW + installationCost) *
      stateFactor *
      regionFactor *
      scalingFactor;

    setIsOpen(true);
    console.log({ budget });
    setFormData(budget);
  };

  return (
    <>
      <header className="bg-gray-900 text-white py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center">
          <SunIcon className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold">Enner Connect</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link className="hover:text-gray-400" href="#simulator">
            Simule um Orçamento
          </Link>
          <Link className="hover:text-gray-400" href="#marketplaces">
            Marketplaces Disponíveis
          </Link>
          <Link className="hover:text-gray-400" href="#blog">
            Nosso Blog
          </Link>
        </nav>
        <Button className="md:hidden" size="sm" variant="outline">
          <MenuIcon className="h-6 w-6" />
        </Button>
      </header>
      <section className="bg-gray-900 text-white py-12 md:py-24 px-6 md:px-12 flex flex-col md:flex-row items-center justify-around">
        <div className="space-y-4 max-w-md">
          <h1 className="text-3xl md:text-4xl font-bold">
            Encontre o melhor marketplace de energia solar
          </h1>
          <p className="text-gray-400">
            Nosso marketplace conecta você com as melhores empresas de energia
            solar do mercado. Simule um orçamento agora mesmo.
          </p>
          <Link
            className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium py-3 px-6 rounded-md"
            href="#simulator"
          >
            Simule um Orçamento
          </Link>
        </div>
        <img
          alt="Solar Panels"
          className="mt-8 md:mt-0 rounded-md"
          height={400}
          src="/img/sun.jpg"
          style={{
            aspectRatio: "500/400",
            objectFit: "cover",
          }}
          width={500}
        />
      </section>
      <section id="simulator" className="bg-gray-900 text-white py-12 md:py-24 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simule um orçamento
            </h2>
            <p className="text-gray-600 mb-8">
              Obtenha uma estimativa de economia para sua resideência e custo de
              instalação.
            </p>
            <form
              onSubmit={handleSubmit}
              className="bg-gray-900 rounded-lg shadow-sm shadow-gray-800 p-5 pt-1 text-left grid grid-cols-1 gap-4"
            >
              <div className="">
                <Label htmlFor="home-size">Consumo médio mensal(kWh)</Label>
                <Input id="home-size" name="averageAmount" type="number" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="state">Estado</Label>
                <Select name="state">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ac">Acre</SelectItem>
                    <SelectItem value="al">Alagoas</SelectItem>
                    <SelectItem value="ap">Amapá</SelectItem>
                    <SelectItem value="am">Amazonas</SelectItem>
                    <SelectItem value="ba">Bahia</SelectItem>
                    <SelectItem value="ce">Ceará</SelectItem>
                    <SelectItem value="df">Distrito Federal</SelectItem>
                    <SelectItem value="es">Espírito Santo</SelectItem>
                    <SelectItem value="go">Goiás</SelectItem>
                    <SelectItem value="ma">Maranhão</SelectItem>
                    <SelectItem value="mt">Mato Grosso</SelectItem>
                    <SelectItem value="ms">Mato Grosso do Sul</SelectItem>
                    <SelectItem value="mg">Minas Gerais</SelectItem>
                    <SelectItem value="pa">Pará</SelectItem>
                    <SelectItem value="pb">Paraíba</SelectItem>
                    <SelectItem value="pr">Paraná</SelectItem>
                    <SelectItem value="pe">Pernambuco</SelectItem>
                    <SelectItem value="pi">Piauí</SelectItem>
                    <SelectItem value="rj">Rio de Janeiro</SelectItem>
                    <SelectItem value="rn">Rio Grande do Norte</SelectItem>
                    <SelectItem value="rs">Rio Grande do Sul</SelectItem>
                    <SelectItem value="ro">Rondônia</SelectItem>
                    <SelectItem value="rr">Roraima</SelectItem>
                    <SelectItem value="sc">Santa Catarina</SelectItem>
                    <SelectItem value="sp">São Paulo</SelectItem>
                    <SelectItem value="se">Sergipe</SelectItem>
                    <SelectItem value="to">Tocantins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="region">Zona de instalação</Label>
                <Select name="region">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a zona de instalação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urban">Urbana</SelectItem>
                    <SelectItem value="rural">Rural</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" type="submit">
                Obter estimativa
              </Button>
            </form>
            {formData ? (
              <div className="bg-gray-800 text-white mt-8 p-4 rounded-lg">
                <h3 className="text-2xl font-bold">Estimativa de Orçamento</h3>
                <p className="mt-2">
                  A estimativa do orçamento para a instalação de energia solar é
                  de:
                </p>
                <p className="text-xl font-bold">{formData.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
              </div>
            ) : null}
          </div>
        </div>
      </section>
      <section id="marketplaces" className="py-12 md:py-24 px-6 md:px-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          Marketplaces Disponíveis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>SolEnergia</CardTitle>
              <CardDescription>
                Empresa líder em soluções de energia solar para residências e
                empresas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <SunIcon className="h-6 w-6" />
                <span>Painéis Solares</span>
              </div>
              <div className="flex items-center space-x-2">
                <CloudLightningIcon className="h-6 w-6" />
                <span>Inversores</span>
              </div>
              <div className="flex items-center space-x-2">
                <TruckIcon className="h-6 w-6" />
                <span>Instalação</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link
                className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium py-2 px-4 rounded-md"
                href="#"
              >
                Solicitar Orçamento
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>EcoLuz Solar</CardTitle>
              <CardDescription>
                Empresa especializada em soluções de energia solar para grandes
                empreendimentos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <SunIcon className="h-6 w-6" />
                <span>Painéis Solares</span>
              </div>
              <div className="flex items-center space-x-2">
                <CloudLightningIcon className="h-6 w-6" />
                <span>Inversores</span>
              </div>
              <div className="flex items-center space-x-2">
                <TruckIcon className="h-6 w-6" />
                <span>Instalação</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link
                className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium py-2 px-4 rounded-md"
                href="#"
              >
                Solicitar Orçamento
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>VitaSolar</CardTitle>
              <CardDescription>
                Empresa com soluções de energia solar personalizadas para
                residências.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <SunIcon className="h-6 w-6" />
                <span>Painéis Solares</span>
              </div>
              <div className="flex items-center space-x-2">
                <CloudLightningIcon className="h-6 w-6" />
                <span>Inversores</span>
              </div>
              <div className="flex items-center space-x-2">
                <TruckIcon className="h-6 w-6" />
                <span>Instalação</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link
                className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium py-2 px-4 rounded-md"
                href="#"
              >
                Solicitar Orçamento
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>
      <section id="blog" className="bg-gray-300 py-12 md:py-24 px-6 md:px-12">
        <h2 className="text-gray-900 text-2xl md:text-3xl font-bold mb-8">
          Nosso Blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <img
              alt="Blog Post Image"
              className="rounded-t-md w-full"
              height={300}
              src="/img/blog-home.jpg"
              style={{
                aspectRatio: "400/300",
                objectFit: "cover",
              }}
            />
            <CardContent>
              <div className="flex items-center space-x-2 mb-2 mt-3">
                <CalendarIcon className="h-5 w-5 text-gray-500" />
                <span className="text-gray-500">19 de Maio, 2024</span>
              </div>
              <h3 className="text-lg font-bold mb-2">
                Dicas para escolher o melhor sistema solar para sua casa
              </h3>
              <p className="text-gray-600 line-clamp-3">
                Descubra as melhores dicas para escolher o sistema solar ideal
                para sua casa, levando em conta fatores como tamanho do telhado,
                consumo de energia e orçamento.
              </p>
            </CardContent>
            <CardFooter>
              <Link className="text-yellow-500 hover:text-yellow-600" href="#">
                Leia Mais
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <img
              alt="Blog Post Image"
              className="rounded-t-md w-full"
              height={300}
              src="/img/blog-company.jpg"
              style={{
                aspectRatio: "400/300",
                objectFit: "cover",
              }}
            />
            <CardContent>
              <div className="flex items-center space-x-2 mb-2 mt-3">
                <CalendarIcon className="h-5 w-5 text-gray-500" />
                <span className="text-gray-500">28 de Abril, 2024</span>
              </div>
              <h3 className="text-lg font-bold mb-2">
                Os benefícios da energia solar para empresas
              </h3>
              <p className="text-gray-600 line-clamp-3">
                Entenda os principais benefícios da adoção de energia solar para
                empresas, como redução de custos, sustentabilidade e valorização
                do imóvel.
              </p>
            </CardContent>
            <CardFooter>
              <Link className="text-yellow-500 hover:text-yellow-600" href="#">
                Leia Mais
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <img
              alt="Blog Post Image"
              className="rounded-t-md w-full"
              height={300}
              src="/img/blog-savings.jpg"
              style={{
                aspectRatio: "400/300",
                objectFit: "cover",
              }}
            />
            <CardContent>
              <div className="flex items-center space-x-2 mb-2 mt-3">
                <CalendarIcon className="h-5 w-5 text-gray-500" />
                <span className="text-gray-500">15 de Março, 2024</span>
              </div>
              <h3 className="text-lg font-bold mb-2">
                Como funciona o financiamento de energia solar?
              </h3>
              <p className="text-gray-600 line-clamp-3">
                Descubra as opções de financiamento disponíveis para a
                instalação de sistemas de energia solar, desde empréstimos a
                programas de incentivo governamentais.
              </p>
            </CardContent>
            <CardFooter>
              <Link className="text-yellow-500 hover:text-yellow-600" href="#">
                Leia Mais
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>
      <footer className="bg-gray-900 text-white py-8 px-6 md:px-12">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <SunIcon className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">Enner Connect</span>
          </div>
          <nav className="flex space-x-6 mt-4 md:mt-0">
            <Link className="hover:text-gray-400" href="#simulator">
              Simule um Orçamento
            </Link>
            <Link className="hover:text-gray-400" href="#marketplaces">
              Marketplaces Disponíveis
            </Link>
            <Link className="hover:text-gray-400" href="#blog">
              Nosso Blog
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function CloudLightningIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
      <path d="m13 12-3 5h4l-3 5" />
    </svg>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function SunIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function TruckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}
